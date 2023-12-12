import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeftIcon, EyeIcon, EyeOffIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../../utils/formSchema";
import ChangePhoneNumberModal from "./ChangePhoneNumberModal";
import { useDispatch, useSelector } from "react-redux";
import { revertAll, storeLoggedInUser } from "../../../redux/features/authSlice";
import { setKey } from "../../../utils/mobilePreferences";
import { capitalizeString } from "../../../utils/capitalizeString";
import { Capacitor } from "@capacitor/core";
import useFetch from "../../../hooks/useFetch";
import PageHeading from "../../shared/PageHeading";
import UpdatePhoneNumberForm from "./UpdatePhoneNumberForm";
import FormModal from "../../shared/FormModal";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const UPDATE_PASSWORD = "/user/updatePassword";

const Profile = () => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [loading, setLoading] = useState(false);
    const [revealPwd, setRevealPwd] = useState(false);
    const [revealConfirmPwd, setRevealConfirmPwd] = useState(false);
    const [showUpdatePhoneNumForm, setShowUpdatePhoneNumForm] = useState(false);
    const [platform, setPlatform] = useState("");

    const fetchUserProfile = useFetch("/user/profile", "userProfile");

    const fetchUserData = async () => {
        const info = fetchUserProfile.data;
        const profileInfo = {
            id: info.id,
            firstName: info.firstName,
            lastName: info.lastName,
            phone: info.phone,
            email: info.email,
            customerId: info.stripeCustomerId,
        };
        dispatch(storeLoggedInUser(profileInfo));
        // mobile storage
        await setKey("loggedInUser", profileInfo);
    };

    useEffect(() => {
        if (fetchUserProfile.isSuccess) {
            fetchUserData();
        }
    }, [fetchUserProfile.isSuccess]);

    useEffect(() => {
        setPlatform(Capacitor.getPlatform());
    }, []);

    const redirectToWebApp = () => {
        window.alert("Visit the web app at https://app.ihsmia.com");
    };

    const handlePortal = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            if (platform !== "web") {
                redirectToWebApp();
                setLoading(false);
                return;
            }

            const res = await axiosPrivate.post(
                "/portal",

                JSON.stringify({
                    customer: loggedInUser.customerId,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            setLoading(false);

            const body = await res.data;
            window.location.href = body.url;
        } catch (e) {
            console.log(`Uncaught Exception ${e}`);
        }
    };

    const onSubmit = async (values, actions) => {
        const password = values.password;

        setLoading(true);

        await axiosPrivate.post(UPDATE_PASSWORD, JSON.stringify({ password: password }), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        setLoading(false);
        actions.resetForm();

        dispatch(revertAll());

        localStorage.clear();
        navigate("/");
    };

    const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: changePasswordSchema,
        onSubmit,
    });

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>My Profile | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmia.com/" />
                </Helmet>
                <>
                    {loading && <TopBarProgress />}

                    {showUpdatePhoneNumForm && (
                        <FormModal
                            showModal={showUpdatePhoneNumForm}
                            setShowModal={setShowUpdatePhoneNumForm}
                            successMessage={"Phone number update successfully!"}
                            targetForm={UpdatePhoneNumberForm}
                            formProps={{ phone: fetchUserProfile.data?.phone }}
                        />
                    )}

                    <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                        <PageHeading
                            pageName={"My Profile"}
                            previousPageName={"Dashboard"}
                            previousUrl={"/dashboard"}
                        />

                        <div className="my-10 text-gray-600 grid md:grid-cols-2 gap-y-4 ">
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">First Name: </p>
                                <p className="lg:col-start-2">
                                    {fetchUserProfile.isSuccess &&
                                        capitalizeString(fetchUserProfile.data?.firstName)}
                                </p>
                            </div>
                            <div className="flex space-x-4 ">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Last Name: </p>
                                <p className="lg:col-start-2">
                                    {fetchUserProfile.isSuccess &&
                                        capitalizeString(fetchUserProfile.data?.lastName)}
                                </p>
                            </div>
                            <div className="flex space-x-4 md:order-3">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Phone Number: </p>
                                <p className="lg:col-start-2">
                                    {fetchUserProfile.isSuccess && fetchUserProfile.data?.phone}
                                </p>
                            </div>

                            <div className="flex space-x-4 md:order-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Email: </p>
                                <p className="lg:col-start-2">
                                    {fetchUserProfile.isSuccess && fetchUserProfile.data?.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex ">
                            <button className="w-64" onClick={() => setShowUpdatePhoneNumForm(true)}>
                                Update Phone Number
                            </button>
                        </div>
                        <hr className="my-10" />

                        <form onSubmit={handlePortal}>
                            <input
                                type="hidden"
                                name="priceId"
                                id="priceId"
                                value="price_1LrhbqIGWAGjsS3FN6qfb8fW"
                            />
                            <button
                                type="submit"
                                className="w-64 bg-ihs-green focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 text-base"
                            >
                                Visit Customer Portal
                            </button>
                        </form>

                        <hr className="my-10" />

                        <p className="text-lg tracking-wide text-ihs-green">Change Password</p>

                        <form className="my-5 grid w-64" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-500 mb-2"
                                >
                                    New Password <span className="text-red-600">*</span>
                                </label>
                                <span className="flex items-center">
                                    <input
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type={revealPwd ? "text" : "password"}
                                        id="password"
                                        placeholder="New Password"
                                        className={` ${
                                            errors.password && touched.password
                                                ? "focus:ring-red-600"
                                                : "focus:ring-ihs-green-shade-600"
                                        } w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                                    />
                                    {revealPwd ? (
                                        <EyeOffIcon
                                            className="w-4 -ml-6 text-gray-500"
                                            onClick={() => setRevealPwd((prevState) => !prevState)}
                                        />
                                    ) : (
                                        <EyeIcon
                                            className="w-4 -ml-6 text-gray-500"
                                            onClick={() => setRevealPwd((prevState) => !prevState)}
                                        />
                                    )}
                                </span>
                                {errors.password && touched.password && (
                                    <p className="animate-fly-in-y text-red-500 normal-case text-xs mt-2">
                                        {errors.password}
                                    </p>
                                )}
                            </div>
                            <div className="">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-500 py-2"
                                >
                                    Confirm Password <span className="text-red-600">*</span>
                                </label>
                                <span className="flex items-center">
                                    <input
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type={revealConfirmPwd ? "text" : "password"}
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        className={` ${
                                            errors.confirmPassword && touched.confirmPassword
                                                ? "focus:ring-red-600"
                                                : "focus:ring-ihs-green-shade-600"
                                        } w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                                    />
                                    {revealConfirmPwd ? (
                                        <EyeOffIcon
                                            className="w-4 -ml-6 text-gray-500"
                                            onClick={() => setRevealConfirmPwd((prevState) => !prevState)}
                                        />
                                    ) : (
                                        <EyeIcon
                                            className="w-4 -ml-6 text-gray-500"
                                            onClick={() => setRevealConfirmPwd((prevState) => !prevState)}
                                        />
                                    )}
                                </span>
                                {errors.confirmPassword && touched.confirmPassword && (
                                    <p className="animate-fly-in-y text-red-500 normal-case text-xs mt-2">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    disabled={Object.keys(errors).length > 0 || isSubmitting}
                                    className="mt-4 mb-10 bg-ihs-green w-64"
                                >
                                    {isSubmitting ? "Updating Password" : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            </>
        </HelmetProvider>
    );
};

export default Profile;
