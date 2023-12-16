import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import BeneficiariesTable from "./beneficiary/table/BeneficiariesTable";
import AppointmentTable from "./appointment/tables/AppointmentTable";
import { userRoles } from "../../data/enums";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import AllAppointmentsTable from "./appointment/tables/AllAppointmentsTable";
import { useDispatch, useSelector } from "react-redux";
import { storeLoggedInUser } from "../../redux/features/authSlice";
import { getKey, setKey } from "../../utils/mobilePreferences";
import OneSignal from "onesignal-cordova-plugin";
import { capitalizeString } from "../../utils/capitalizeString";
import useFetch from "../../hooks/useFetch";
import comet from "../../assets/images/comet-1.1s-200px.png";
import Eclipse from "../../assets/images/Eclipse-1s-200px.svg";
import Spinner from "./SVGs/Spinner";

// TopBarProgress.config({
//     barColors: {
//         0: "#05afb0",
//     },
//     shadowBlur: 5,
// });

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

    const fetchUserData = async () => {
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
    };

    useEffect(() => {
        if (fetchUserProfile.isSuccess) {
            fetchUserData();
        }
    }, [fetchUserProfile.isSuccess]);

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
                    <div className="my-6">
                        <h2 className="md:text-4xl text-3xl mb-2">
                            Hello{" "}
                            {capitalizeString(loggedInUser?.firstName) ||
                                capitalizeString(mobileLoggedInUser?.firstName)}
                        </h2>
                        <p className="text-slate-500 text-xl">Welcome to your dashboard</p>
                    </div>

                    <hr className="my-8" />

                    {/*User Cards*/}
                    <div className="grid grid-cols-2 md:gap-6 gap-4 my-8 lg:grid-cols-5">
                        <div
                            onClick={() => navigate("/beneficiaries")}
                            className="md:p-4 p-2 rounded bg-ihs-blue-shade-50 md:text-lg shadow-md flex flex-col space-y-8 justify-between cursor-pointer"
                        >
                            <p>Your Beneficiaries</p>

                            {fetchBeneficiaries.isSuccess ? (
                                <span className="font-semibold md:text-3xl text-2xl pr-0.5 md:pr-2">
                                    {fetchBeneficiaries.data ? fetchBeneficiaries.data?.length : 0}
                                </span>
                            ) : (
                                <Spinner style={{ width: "2rem" }} />
                            )}
                        </div>

                        <div
                            onClick={() => navigate("/appointments")}
                            className="md:p-4 p-2 rounded bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col space-y-8 justify-between cursor-pointer"
                        >
                            <p>Your Appointments</p>
                            {fetchAppointments.isSuccess ? (
                                <span className="font-semibold md:text-3xl text-2xl pr-0.5 md:pr-2">
                                    {fetchAppointments.data ? fetchAppointments.data?.length : 0}
                                </span>
                            ) : (
                                <Spinner style={{ width: "2rem" }} />
                            )}
                        </div>

                        {(mobileAuth?.userType || userType) !== userRoles.User && (
                            <>
                                <div
                                    onClick={() => navigate("/users")}
                                    className="md:p-4 p-2 rounded bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col space-y-8 justify-between cursor-pointer"
                                >
                                    <p>Total Users</p>
                                    {fetchMetrics.isSuccess ? (
                                        <span className="font-semibold md:text-3xl text-2xl pr-0.5 md:pr-2">
                                            {fetchMetrics.data ? fetchMetrics.data.totalUsers : 0}
                                        </span>
                                    ) : (
                                        <Spinner style={{ width: "2rem" }} />
                                    )}
                                </div>
                                <div
                                    onClick={() => navigate("/users")}
                                    className="md:p-4 p-2 rounded bg-ihs-blue-shade-50 md:text-lg shadow-md flex flex-col space-y-8 justify-between cursor-pointer"
                                >
                                    <p>Total Appointments</p>
                                    {fetchMetrics.isSuccess ? (
                                        <span className="font-semibold md:text-3xl text-2xl pr-0.5 md:pr-2">
                                            {fetchMetrics.data ? fetchMetrics.data.totalAppointments : 0}
                                        </span>
                                    ) : (
                                        <Spinner style={{ width: "2rem" }} />
                                    )}
                                </div>
                                <div
                                    onClick={() => navigate("/healthworkers")}
                                    className="md:p-4 p-2 rounded bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col space-y-8 justify-between cursor-pointer"
                                >
                                    <p>Total Health Workers</p>
                                    {fetchMetrics.isSuccess ? (
                                        <span className="font-semibold md:text-3xl text-2xl pr-0.5 md:pr-2">
                                            {fetchMetrics.data ? fetchMetrics.data.totalHealthWorkers : 0}
                                        </span>
                                    ) : (
                                        <Spinner style={{ width: "2rem" }} />
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <hr className="my-10" />

                    {(mobileAuth?.userType || userType) === userRoles.User && (
                        <>
                            {/*Beneficiaries Section*/}
                            <div className="flex justify-between items-center mt-16">
                                <h2 className="md:text-2xl text-xl">Your Beneficiaries</h2>
                                <button
                                    className="py-2 md:px-4 px-2"
                                    onClick={() => navigate("/beneficiaries/addbeneficiary")}
                                >
                                    Add Beneficiary
                                </button>
                            </div>

                            {/*Beneficiaries Table*/}
                            {fetchBeneficiaries.isSuccess ? (
                                <BeneficiariesTable beneficiaries={fetchBeneficiaries.data} />
                            ) : (
                                <div className="w-full min-h-40 p-6 grid items-center">
                                    <Spinner style={{ width: "10%", margin: "0 auto" }} />
                                </div>
                            )}

                            {/*Appointments Section*/}
                            <div className="flex justify-between items-center mt-16">
                                <h2 className="md:text-2xl text-xl">Your Appointments</h2>
                                <button
                                    className="py-3 md:px-4 px-2"
                                    onClick={() => navigate("/appointments/bookappointment")}
                                >
                                    Book Appointments
                                </button>
                            </div>

                            {/*Appointments Table*/}
                            {fetchAppointments.isSuccess ? (
                                <AppointmentTable appointments={fetchAppointments.data} />
                            ) : (
                                <div className="w-full min-h-40 p-6 grid items-center">
                                    <Spinner style={{ width: "10%", margin: "0 auto" }} />
                                </div>
                            )}
                        </>
                    )}

                    {(mobileAuth?.userType || userType) !== userRoles.User && (
                        <>
                            <div className="flex justify-between items-center mt-12 mb-8">
                                <h2 className="md:text-2xl text-xl">All Appointments</h2>
                            </div>

                            {fetchAllAppointments.isSuccess ? (
                                <AllAppointmentsTable appointments={fetchAllAppointments.data} />
                            ) : (
                                <div className="w-full min-h-40 p-6 grid items-center">
                                    <Spinner style={{ width: "10%", margin: "0 auto" }} />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </>
        </HelmetProvider>
    );
};

export default Dashboard;
