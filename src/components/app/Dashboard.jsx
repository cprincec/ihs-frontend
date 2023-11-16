import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BeneficiariesTable from "./beneficiary/BeneficiariesTable";
import AppointmentTable from "./appointment/AppointmentTable";
import { userRoles } from "../../data/enums";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import AllAppointmentsTable from "./appointment/AllAppointmentsTable";
import { useDispatch, useSelector } from "react-redux";
import { storeLoggedInUser } from "../../redux/features/authSlice";
import { getKey, setKey } from "../../utils/mobilePreferences";
import OneSignal from "onesignal-cordova-plugin";
import { capitalizeString } from "../../utils/capitalizeString";
import useFetch from "../../hooks/useFetch";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const Dashboard = () => {
    const [mobileAuth, setMobileAuth] = useState("");
    const [mobileLoggedInUser, setMobileLoggedInUser] = useState("");
    const dispatch = useDispatch();

    const userType = useSelector((state) => state.auth.userAccess.userType);
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    const navigate = useNavigate();

    const isAdminOrEmployee =
        mobileAuth?.userType === userRoles.Admin ||
        userType === userRoles.Admin ||
        mobileAuth?.userType === userRoles.Employee ||
        userType === userRoles.Employee;

    useEffect(() => {
        async function initializeOnesignal() {
            try {
                if (window.cordova) {
                    OneSignal.setLogLevel(6, 0);
                    OneSignal.setAppId("0056d358-938a-42ca-bad9-2aae6d5f2bfa");

                    const externalUserId = loggedInUser?.id;
                    if (externalUserId) {
                        OneSignal.setExternalUserId(externalUserId);
                    }

                    OneSignal.setNotificationOpenedHandler(function (jsonData) {
                        const data = jsonData?.notification?.additionalData;

                        console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
                        console.log("additionalData: " + JSON.stringify(data));

                        if (data.url) {
                            navigate(data.url);
                        }
                    });
                    // Prompts the user for notification permissions.
                    //    * Since this shows a generic native prompt, we recommend
                    //    instead using an In-App Message to prompt for notification
                    //    permission (See step 7) to better communicate to your users
                    //    what notifications they will get.
                    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
                        console.log("User accepted notifications: " + accepted);
                    });
                } else {
                    console.log("Cordova is not available. Skipping OneSignal initialization.");
                }
            } catch (error) {
                console.log("ONESIGNAL INITIALIZATION ERROR", error);
            }
        }

        initializeOnesignal();
    }, [navigate, loggedInUser?.id]);

    // get auth mobile preferences
    useEffect(() => {
        getKey("auth")
            .then((result) => {
                setMobileAuth(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    useEffect(() => {
        getKey("loggedInUser")
            .then((result) => {
                setMobileLoggedInUser(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // // get logged in user
    const fetchUserProfile = useFetch("/user/profile", "userProfile");

    const fetchUserData = useCallback(async () => {
        const info = fetchUserProfile.data;
        if (!info) {
            return;
        }
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
    }, []);

    useEffect(() => {
        if (fetchUserProfile.isSuccess) {
            console.log("There is data: ", fetchUserProfile.data);
            fetchUserData();
        }
    }, [fetchUserData, fetchUserProfile.isSuccess]);

    // get user beneficiaries
    const fetchBeneficiaries = useFetch("/user/beneficiaries", "beneficiaries");

    // get all appointments
    const fetchAllAppointments = useFetch(
        "/admin/appointments",
        "allAppointments",
        1000 * 60 * 5,
        isAdminOrEmployee
    );

    // get appointments
    const fetchAppointments = useFetch("/user/appointments", "appointments");

    // get metrics
    const fetchMetrics = useFetch("/metrics", "metrics", 1000 * 60 * 5, isAdminOrEmployee);

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>Dashboard | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmia.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {(fetchAppointments.isLoading ||
                        fetchBeneficiaries.isLoading ||
                        fetchMetrics.isLoading ||
                        fetchAllAppointments.isLoading) && <TopBarProgress />}
                    <div className="my-5 lg:mt-10">
                        <h2 className="md:text-4xl text-3xl mb-3">
                            Hello{" "}
                            {capitalizeString(loggedInUser?.firstName) ||
                                capitalizeString(mobileLoggedInUser?.firstName)}
                        </h2>
                        <p className="text-slate-500 text-xl">Welcome to your dashboard</p>
                    </div>

                    <hr className="my-10" />

                    {/*User Cards*/}
                    <div className="grid md:grid-cols- grid-cols-2 md:gap-7 gap-3 my-10">
                        <NavLink to="/beneficiaries">
                            <div className="h-40 md:p-5 p-3 rounded-md bg-ihs-blue-shade-50 md:text-lg shadow-md flex flex-col justify-between">
                                <p>Your Beneficiaries</p>
                                <p className="mb-4">
                                    <span className="font-semibold md:text-3xl text-2xl pr-0.5 md:pr-2">
                                        {fetchBeneficiaries.data ? fetchBeneficiaries.data?.length : 0}
                                    </span>
                                    Beneficiaries
                                </p>
                            </div>
                        </NavLink>

                        <NavLink to="/appointments">
                            <div className="h-40 md:p-5 p-3 rounded-md bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col justify-between">
                                <p>Your Appointments</p>
                                <p className="mb-4">
                                    <span className="font-semibold md:text-3xl text-xl pr-0.5 md:pr-2">
                                        {fetchAppointments.data ? fetchAppointments.data?.length : 0}
                                    </span>
                                    Appointments
                                </p>
                            </div>
                        </NavLink>
                    </div>

                    {(mobileAuth?.userType || userType) !== userRoles.User && fetchMetrics.isSuccess && (
                        <>
                            {/*Admin Cards*/}
                            <div className="grid md:grid-cols-3 grid-cols-2 md:gap-7 gap-3 my-10">
                                <NavLink to="/users">
                                    <div className="h-40 md:p-5 p-3 rounded-md bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col justify-between">
                                        <p>Total Users</p>
                                        <p className="mb-4">
                                            <span className="font-semibold md:text-3xl text-xl pr-0.5 md:pr-2">
                                                {fetchMetrics.isSuccess ? fetchMetrics.data.totalUsers : 0}
                                            </span>
                                            Users
                                        </p>
                                    </div>
                                </NavLink>
                                <NavLink to="/allappointments">
                                    <div className="h-40 md:p-5 p-3 rounded-md bg-ihs-blue-shade-50 md:text-lg shadow-md flex flex-col justify-between">
                                        <p>Total Appointments</p>
                                        <p className="mb-4">
                                            <span className="font-semibold md:text-3xl text-xl pr-0.5 md:pr-2">
                                                {fetchMetrics.isSuccess
                                                    ? fetchMetrics.data.totalAppointments
                                                    : 0}
                                            </span>
                                            Appointments
                                        </p>
                                    </div>
                                </NavLink>
                                <NavLink to="/healthworkers">
                                    <div className="h-40 md:p-5 p-3 rounded-md bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col justify-between">
                                        <p>Total Health Workers</p>
                                        <p className="mb-4">
                                            <span className="font-semibold md:text-3xl text-xl pr-0.5 md:pr-2">
                                                {fetchMetrics.isSuccess
                                                    ? fetchMetrics.data.totalHealthWorkers
                                                    : 0}
                                            </span>
                                            Health Workers
                                        </p>
                                    </div>
                                </NavLink>
                            </div>
                        </>
                    )}

                    {(mobileAuth?.userType || userType) === userRoles.User && (
                        <>
                            {/*Beneficiaries Section*/}
                            <div className="flex justify-between items-center mt-20">
                                <h2 className="md:text-2xl text-xl">Your Beneficiaries</h2>
                                <button
                                    className="py-3 md:px-4 px-2"
                                    onClick={() => navigate("/beneficiaries/addbeneficiary")}
                                >
                                    Add Beneficiary
                                </button>
                            </div>

                            <hr className="my-10" />

                            {/*Beneficiaries Table*/}
                            {fetchBeneficiaries.isSuccess && (
                                <BeneficiariesTable beneficiaries={fetchBeneficiaries.data} />
                            )}

                            {/*Appointments Section*/}
                            <div className="flex justify-between items-center mt-20">
                                <h2 className="md:text-2xl text-xl">Your Appointments</h2>
                                <button
                                    className="py-3 md:px-4 px-2"
                                    onClick={() => navigate("/appointments/bookappointment")}
                                >
                                    Book Appointments
                                </button>
                            </div>

                            <hr className="my-10" />

                            {/*Appointments Table*/}
                            {fetchAppointments.isSuccess && (
                                <AppointmentTable appointments={fetchAppointments.data} />
                            )}
                        </>
                    )}

                    {(mobileAuth?.userType || userType) !== userRoles.User &&
                        fetchAllAppointments.isSuccess && (
                            <>
                                {/*Appointments Section*/}
                                <div className="flex justify-between items-center mt-20">
                                    <h2 className="md:text-2xl text-xl">All Appointments</h2>
                                </div>

                                <hr className="my-10" />

                                {/*Appointments Table*/}

                                {<AllAppointmentsTable appointments={fetchAllAppointments.data} />}
                                {/* <AppointmentTable /> */}
                            </>
                        )}
                </div>
            </>
        </HelmetProvider>
    );
};

export default Dashboard;
