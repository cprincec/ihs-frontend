import React, { useCallback, useEffect, useState } from "react";
import {
  ChevronLeftIcon,
  EyeIcon,
  EyeOffIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../../utils/formSchema";
import ChangePhoneNumberModal from "./ChangePhoneNumberModal";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  revertAll,
  storeLoggedInUser,
} from "../../../redux/features/authSlice";
import { setKey } from "../../../utils/mobilePreferences";
import { capitalizeString } from "../../../utils/capitalizeString";
import { Capacitor } from "@capacitor/core";

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
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [revealPwd, setRevealPwd] = useState(false);
  const [revealConfirmPwd, setRevealConfirmPwd] = useState(false);
  const [showUpdatePhoneModal, setShowUpdatePhoneModal] = useState(false);
  const [updatePhoneModalSuccess, setUpdatePhoneModalSuccess] = useState(false);
  const [platform, setPlatform] = useState("");

  const fetchUserData = useCallback(async () => {
    try {
      const result = await dispatch(fetchUserProfile()).unwrap();
      dispatch(storeLoggedInUser(result));

      // mobile storage
      await setKey("loggedInUser", result);
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/", { state: { from: location }, replace: true });
      }
    }
  }, [dispatch, location, navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (updatePhoneModalSuccess === true) {
      fetchUserData();
    }
  }, [fetchUserData, updatePhoneModalSuccess]);

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

    await axiosPrivate.post(
      UPDATE_PASSWORD,
      JSON.stringify({ password: password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    setLoading(false);
    actions.resetForm();

    dispatch(revertAll());

    localStorage.clear();
    navigate("/");
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit,
  });

  const handleShowUpdatePhoneModal = () => {
    setShowUpdatePhoneModal(true);
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>My Profile | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <>
          {loading && <TopBarProgress />}

          {/*	show modal if modal is toggled*/}
          {showUpdatePhoneModal && (
            <ChangePhoneNumberModal
              existingPhoneNumber={loggedInUser.phone}
              setShowUpdatePhoneModal={setShowUpdatePhoneModal}
              updatePhoneModalSuccess={updatePhoneModalSuccess}
              setUpdatePhoneModalSuccess={setUpdatePhoneModalSuccess}
            />
          )}

          <div className="lg:px-20 lg:py-4 md:px-10 p-3">
            <button
              className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
              onClick={() => navigate("/dashboard")}
            >
              <ChevronLeftIcon className="w-6" />{" "}
              <p className="text-lg px-5">Back to Dashboard</p>
            </button>
            <div className="flex-1">
              <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                <div className="flex">
                  <UserCircleIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                  <h3 className="md:text-3xl sm:text-2xl text-xl py-8 md:px-8 px-2">
                    My Profile
                  </h3>
                </div>
              </div>

              <div className="my-10 md:ml-5 text-gray-600 md:text-xl text-md">
                <div className="grid grid-cols-5">
                  <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                    First Name:{" "}
                  </p>
                  <p className="py-5 md:ml-5 md:col-start-2">
                    {loggedInUser
                      ? capitalizeString(loggedInUser?.firstName)
                      : ""}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-5">
                  <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                    Last Name:{" "}
                  </p>
                  <p className="py-5 md:ml-5 md:col-start-2">
                    {loggedInUser
                      ? capitalizeString(loggedInUser?.lastName)
                      : ""}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-5">
                  <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-1">
                    Email:{" "}
                  </p>
                  <p className="py-5 md:ml-5 md:col-start-2">
                    {loggedInUser ? loggedInUser?.email : ""}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-5">
                  <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                    Phone Number:{" "}
                  </p>
                  <p className="py-5 md:ml-5 md:col-start-2">
                    {loggedInUser ? loggedInUser?.phone : ""}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-5">
                  <button
                    className="py-5 col-start-1 col-span-2 text-ihs-green bg-transparent border-0 text-start"
                    onClick={handleShowUpdatePhoneModal}
                  >
                    Update Phone Number
                  </button>
                </div>
              </div>
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
                className="px-4 py-3 mt-5 mb-5 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 sm:w-96 w-72 text-lg"
              >
                Visit Customer Portal
              </button>
            </form>

            <hr className="my-10" />

            <p className="text-xl text-ihs-green">Change Password</p>

            <form className="my-5 space-y-0" onSubmit={handleSubmit}>
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
                  } sm:w-96 w-72 border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
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
                <p className="text-red-500 normal-case text-xs mt-2">
                  {errors.password}
                </p>
              )}

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
                  } sm:w-96 w-72 border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                />
                {revealConfirmPwd ? (
                  <EyeOffIcon
                    className="w-4 -ml-6 text-gray-500"
                    onClick={() =>
                      setRevealConfirmPwd((prevState) => !prevState)
                    }
                  />
                ) : (
                  <EyeIcon
                    className="w-4 -ml-6 text-gray-500"
                    onClick={() =>
                      setRevealConfirmPwd((prevState) => !prevState)
                    }
                  />
                )}
              </span>
              {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 normal-case text-xs mt-2">
                  {errors.confirmPassword}
                </p>
              )}

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                  className="disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none px-4 py-3 mt-5 mb-10 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 sm:w-96 w-72 text-lg"
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
