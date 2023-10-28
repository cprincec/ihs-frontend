import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { appointmentStatus, userRoles } from "../../../data/enums";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import { useSelector } from "react-redux";
import { getKey } from "../../../utils/mobilePreferences";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import Shimmer from "../Shimmer";
import formatDate from "../../../utils/dateToString";
import usePatch from "../../../hooks/usePatch";
import { useQueryClient } from "@tanstack/react-query";
import { WATDateString } from "../../../hooks/useFormatDate";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const UpdateAppointment = () => {
    const userType = useSelector((state) => state.auth.userAccess.userType);

    const appointmentId = useParams().appointmentId;
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState(false);
    const [mobileAuth, setMobileAuth] = useState("");

    const fetchServices = useFetch("/admin/service/all", "allServices");
    const fetchAppointment = useFetch(
        `${
            (mobileAuth?.userType || userType) === userRoles.User
                ? `/user/appointments/${appointmentId}`
                : `/admin/appointment/${appointmentId}`
        }`,
        `appointment, ${appointmentId}`
    );
    const updateAppointmentMutation = usePatch();
    const completeAppointmentMutation = usePatch();
    const queryClient = useQueryClient();

    // get auth mobile preferences
    useEffect(() => {
        getKey("auth")
            .then((result) => {
                setMobileAuth(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [fetchAppointment.data]);

    const invalidateAppointmentQueries = () => {
        queryClient.invalidateQueries(["allAppointments"]);
        queryClient.invalidateQueries(["appointment"]);
        queryClient.invalidateQueries([`appointment, ${appointmentId}`]);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let appointmentData = {};

        for (const [key, value] of formData) {
            appointmentData[key] = value;
        }

        // Filter service name
        const filteredService = fetchServices.data.filter(
            (service) => service.id === appointmentData.serviceId
        );
        appointmentData = {
            ...appointmentData,
            serviceName: filteredService[0].name,
            date: WATDateString(e.target["date"].value),
        };

        console.log(appointmentData);
        updateAppointmentMutation.mutate(
            {
                url: `/admin/appointment/${appointmentId}`,
                body: appointmentData,
            },
            {
                onError: (error) => setErrMsg(error.message),
                onSuccess: () => {
                    invalidateAppointmentQueries();
                    navigate("/allappointments");
                },
            }
        );
    };

    const handleCompleteAppointment = (e) => {
        e.preventDefault();

        completeAppointmentMutation.mutate(
            {
                url: `/admin/appointment/${appointmentId}/complete`,
                body: { status: appointmentStatus.Completed },
            },
            {
                onError: () => setErrMsg("Something went wrong"),
                onSuccess: () => {
                    invalidateAppointmentQueries();
                    navigate("/allappointments");
                },
            }
        );
    };

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>Update Appointment | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {/* Error Handling */}
                    <p
                        className={
                            errMsg
                                ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
                                : "absolute -left-[99999px]"
                        }
                        aria-live="assertive"
                    >
                        <span className="flex items-center">
                            <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
                            {errMsg}
                        </span>
                    </p>
                    {fetchAppointment.isError &&
                        setErrMsg(fetchAppointment.error.message)}
                    {fetchServices.isError &&
                        setErrMsg(fetchServices.error.message)}
                    {/* Error handling ends */}

                    {(fetchAppointment.isLoading ||
                        fetchServices.isLoading) && <TopBarProgress />}

                    <button
                        className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon className="w-6" />{" "}
                        <p className="text-lg px-5">Back</p>
                    </button>

                    <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                        <div className="flex">
                            <ClipboardCopyIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                            <h3 className="md:text-3xl text-lg py-8 md:px-8 px-2">
                                Update Appointment
                            </h3>
                        </div>

                        {fetchAppointment.isSuccess &&
                            !fetchAppointment.data[0].completed && (
                                <div className="flex md:flex-row flex-col items-center md:gap-x-2 pr-2">
                                    {(mobileAuth?.userType || userType) ===
                                        userRoles.Admin && (
                                        <>
                                            <button
                                                className="sm:text-xl text-sm px-3 my-2"
                                                onClick={
                                                    handleCompleteAppointment
                                                }
                                            >
                                                Mark as Complete
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>

                    <form className="my-16 space-y-0" onSubmit={handleUpdate}>
                        {/*Beneficiary*/}
                        <div className="flex md:flex-row flex-col">
                            <div>
                                <label
                                    htmlFor="beneficiaryName"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Beneficiary
                                    <span className="text-red-600">*</span>
                                </label>
                                {fetchAppointment.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="beneficiaryName"
                                            name="beneficiaryName"
                                            disabled
                                            aria-required="true"
                                            defaultValue={
                                                fetchAppointment?.data[0]
                                                    ?.beneficiaryName
                                            }
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/*Service*/}
                        <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
                            <div>
                                <label
                                    htmlFor="service"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Service
                                    <span className="text-red-600">*</span>
                                </label>
                                {fetchServices.isLoading ||
                                fetchAppointment.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <select
                                            id="serviceId"
                                            name="serviceId"
                                            required
                                            aria-required="true"
                                            defaultValue={
                                                fetchAppointment?.data[0]
                                                    ?.serviceId
                                            }
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 lg:w-96 md:w-72"
                                        >
                                            <option value="">
                                                Select a service
                                            </option>
                                            {fetchServices?.data?.length ? (
                                                fetchServices?.data?.map(
                                                    (service, index) => (
                                                        <option
                                                            key={index}
                                                            value={service?.id}
                                                        >
                                                            {service?.name}
                                                        </option>
                                                    )
                                                )
                                            ) : (
                                                <option value="">
                                                    No services at this time
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/*Date and Time*/}
                        <div className="flex md:flex-wrap md:flex-row flex-col md:pt-10 pt-5 ">
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Date
                                    <span className="text-red-600">*</span>
                                </label>
                                {fetchAppointment.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            required
                                            autoComplete="current-date"
                                            aria-required="true"
                                            defaultValue={formatDate(
                                                fetchAppointment?.data[0]?.date
                                            )}
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="lg:ml-10 lg:mt-0 md:mt-0 md:ml-10 mt-5">
                                <label
                                    htmlFor="time"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Time
                                    <span className="text-red-600">*</span>
                                </label>
                                {fetchAppointment.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            required
                                            autoComplete="current-time"
                                            aria-required="true"
                                            defaultValue={
                                                fetchAppointment?.data[0]?.time
                                            }
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/*Notes*/}
                        <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
                            <div>
                                <label
                                    htmlFor="notes"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Notes
                                </label>
                                {fetchAppointment.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            defaultValue={
                                                fetchAppointment?.data[0]?.notes
                                            }
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 lg:w-96 md:w-72"
                                        ></textarea>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </>
        </HelmetProvider>
    );
};

export default UpdateAppointment;
