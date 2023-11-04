import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import BeneficiaryTable from "./beneficiary/BeneficiaryTable";
import AppointmentTable from "./appointment/AppointmentTable";
import { userRoles } from "../../data/enums";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import AllAppointmentsTable from "./appointment/AllAppointmentsTable";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  storeLoggedInUser,
} from "../../redux/features/authSlice";
import { getKey, setKey } from "../../utils/mobilePreferences";
import OneSignal from "onesignal-cordova-plugin";
import { capitalizeString } from "../../utils/capitalizeString";

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
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [metrics, setMetrics] = useState({});

  const {
    beneficiaries,
    setBeneficiaries,
    appointments,
    setAllAppointments,
    setAppointments,
  } = useAuth();

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

            console.log(
              "notificationOpenedCallback: " + JSON.stringify(jsonData)
            );
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
          OneSignal.promptForPushNotificationsWithUserResponse(function (
            accepted
          ) {
            console.log("User accepted notifications: " + accepted);
          });
        } else {
          console.log(
            "Cordova is not available. Skipping OneSignal initialization."
          );
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

  // get logged in user
  useEffect(() => {
    dispatch(fetchUserProfile())
      .unwrap()
      .then(async (result) => {
        dispatch(storeLoggedInUser(result));

        // mobile storage
        await setKey("loggedInUser", result);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          navigate("/", { state: { from: location }, replace: true });
        }
      });
  }, [dispatch, location, navigate]);

  // get user beneficiaries
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const getBeneficiaries = async () => {
      try {
        const response = await axiosPrivate.get("/user/beneficiaries", {
          signal: controller?.signal,
        });

        isMounted && setBeneficiaries(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getBeneficiaries();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, setBeneficiaries]);

  // get all appointments
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getAllAppointments = async () => {
      try {
        const response = await axiosPrivate.get("/admin/appointments", {
          signal: controller?.signal,
        });

        isMounted && setAllAppointments(response.data.data);
        setHasLoaded(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAdminOrEmployee) {
      getAllAppointments();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [
    axiosPrivate,
    setAllAppointments,
    userType,
    mobileAuth?.userType,
    isAdminOrEmployee,
  ]);

  // get appointments
  useEffect(() => {
    setLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const getAppointments = async () => {
      try {
        const response = await axiosPrivate.get("/user/appointments", {
          signal: controller?.signal,
        });

        isMounted && setAppointments(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getAppointments();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, setAppointments]);

  // get metrics
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getMetrics = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get("/metrics", {
          signal: controller?.signal,
        });

        isMounted && setMetrics(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAdminOrEmployee) {
      getMetrics();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, setMetrics, userType, mobileAuth?.userType]);

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Dashboard | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {loading && <TopBarProgress />}
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
                    {beneficiaries ? beneficiaries?.length : 0}
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
                    {appointments ? appointments?.length : 0}
                  </span>
                  Appointments
                </p>
              </div>
            </NavLink>
          </div>

          {isAdminOrEmployee && (
            <>
              {/*Admin Cards*/}
              <div className="grid md:grid-cols-3 grid-cols-2 md:gap-7 gap-3 my-10">
                <NavLink to="/users">
                  <div className="h-40 md:p-5 p-3 rounded-md bg-ihs-green-shade-50 md:text-lg shadow-md flex flex-col justify-between">
                    <p>Total Users</p>
                    <p className="mb-4">
                      <span className="font-semibold md:text-3xl text-xl pr-0.5 md:pr-2">
                        {/* {metrics.isSuccess ? metrics.data.totalUsers : 0} */}
                        {metrics?.totalUsers || 0}
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
                        {/* {metrics.isSuccess ? metrics.data.totalAppointments : 0} */}
                        {metrics?.totalAppointments || 0}
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
                        {/* {metrics.isSuccess
                          ? metrics.data.totalHealthWorkers
                          : 0} */}
                        {metrics?.totalHealthWorkers || 0}
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
              <BeneficiaryTable />

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
              <AppointmentTable />
            </>
          )}

          {(mobileAuth?.userType || userType) !== userRoles.User && (
            <>
              {/*Appointments Section*/}
              <div className="flex justify-between items-center mt-20">
                <h2 className="md:text-2xl text-xl">All Appointments</h2>
              </div>

              <hr className="my-10" />

              {/*Appointments Table*/}

              {hasLoaded && <AllAppointmentsTable />}
              {/*<AppointmentTable />*/}
            </>
          )}
        </div>
      </>
    </HelmetProvider>
  );
};

export default Dashboard;
