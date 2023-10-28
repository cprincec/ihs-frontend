import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { appointmentStatus } from "../../../data/enums";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import Modal from "../Modal";
import { WATDateString } from "../../../hooks/useFormatDate";
import { capitalizeString } from "../../../utils/capitalizeString";
import { Capacitor } from "@capacitor/core";
import useFetch from "../../../hooks/useFetch";
import usePost from "../../../hooks/usePost";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useQueryClient } from "@tanstack/react-query";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const BookAppointment = () => {
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState(false);
    const [platform, setPlatform] = useState("");
    const [toggleModal, setToggleModal] = useState(false);
    const [beneficiary, setBeneficiary] = useState("");

    const beneficiariesFetch = useFetch("/user/beneficiaries", "beneficiaries");
    const servicesFetch = useFetch("/admin/service/all", "allServices");
    const bookAppointmentMutation = usePost();
    const queryClient = useQueryClient();

    useEffect(() => {
        setPlatform(Capacitor.getPlatform());
    }, []);

    const redirectToWebApp = () => {
        window.alert("Visit the web app at https://app.ihsmdinc.com");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Extract form info with FormData
        const formData = new FormData(e.target);

        // populate appointment data object
        const appointmentData = {};
        for (const [key, value] of formData) {
            appointmentData[key] = value;
        }

        // Find beneficiary of appointment
        const beneficiary = beneficiariesFetch?.data?.filter(
            (ben) => ben.id === appointmentData.beneficiaryId
        );
        setBeneficiary(beneficiary[0]);

        // verify beneficiary coverage subscription
        if (beneficiary[0]?.subscription?.status === "active") {
            const appointmentDate = WATDateString(appointmentData.date);
            const body = {
                ...appointmentData,
                date: appointmentDate,
                status: appointmentStatus.Booked,
            };

            // Mutate
            bookAppointmentMutation.mutate(
                {
                    url: "/appointment/create",
                    body,
                },
                {
                    onError: (error) => setErrMsg(error),
                    onSuccess: () => {
                        queryClient.invalidateQueries(["appointments"]);
                        queryClient.invalidateQueries(["allAppointments"]);
                        navigate("/appointments");
                    },
                }
            );
        } else setToggleModal(true);
    };

    const redirectToPricingPage = () => {
        navigate(
            `/beneficiaries/updatebeneficiary/${beneficiary.id}/addhealthcoverage`
        );
    };

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>Book Appointment | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
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
                    {/** Check loading status of beneficiaries and services fetching */}
                    {(beneficiariesFetch.isLoading ||
                        servicesFetch.isLoading ||
                        bookAppointmentMutation.isLoading) && (
                        <TopBarProgress />
                    )}
                    <button
                        className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 my-5 lg:mt-10"
                        onClick={() => navigate("/appointments")}
                    >
                        <ChevronLeftIcon className="w-6" />{" "}
                        <p className="text-lg px-5">Back to Appointments</p>
                    </button>

                    <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                        <div className="flex">
                            <ClipboardCopyIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                            <h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">
                                Book Appointment
                            </h3>
                        </div>
                    </div>

                    <form className="my-16 space-y-0" onSubmit={handleSubmit}>
                        {/*Beneficiary*/}
                        <div className="flex md:flex-row flex-col">
                            <div>
                                <label
                                    htmlFor="beneficiary"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Beneficiary
                                    <span className="text-red-600">*</span>
                                </label>

                                <div className="mt-1">
                                    <select
                                        id="beneficiary"
                                        name="beneficiaryId"
                                        required
                                        aria-required="true"
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 md:w-96"
                                    >
                                        <option value="">
                                            Select Beneficiary
                                        </option>
                                        {beneficiariesFetch?.data?.length ? (
                                            beneficiariesFetch?.data?.map(
                                                (beneficiary, index) => (
                                                    <option
                                                        key={index}
                                                        value={beneficiary?.id}
                                                    >
                                                        {capitalizeString(
                                                            beneficiary?.firstName
                                                        )}{" "}
                                                        {capitalizeString(
                                                            beneficiary?.lastName
                                                        )}
                                                    </option>
                                                )
                                            )
                                        ) : (
                                            <option value="">
                                                You have no beneficiaries
                                            </option>
                                        )}
                                    </select>
                                </div>
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

                                <div className="mt-1">
                                    <select
                                        id="service"
                                        name="serviceId"
                                        required
                                        aria-required="true"
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 md:w-96"
                                    >
                                        <option value="">
                                            Select a service
                                        </option>
                                        {servicesFetch?.data?.length ? (
                                            servicesFetch?.data?.map(
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
                            </div>
                        </div>
                        {/* Date */}
                        <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
                            <div>
                                <label
                                    htmlFor="date"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Date
                                    <span className="text-red-600">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        required
                                        autoComplete="current-date"
                                        aria-required="true"
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 md:w-96"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Time */}
                        <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
                            <div className="">
                                <label
                                    htmlFor="time"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Time
                                    <span className="text-red-600">*</span>
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        required
                                        autoComplete="current-time"
                                        aria-required="true"
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 md:w-96"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Notes */}
                        <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
                            <div className="">
                                <label
                                    htmlFor="notes"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Notes
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        type="notes"
                                        id="notes"
                                        name="notes"
                                        rows={5}
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 md:w-96"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus:outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {toggleModal &&
                    (platform === "web" ? (
                        <Modal
                            setToggleModal={setToggleModal}
                            executeFunction={redirectToPricingPage}
                            message="Add a health Coverage to beneficiary?"
                            header={"Beneficiary has no health coverage"}
                        />
                    ) : (
                        redirectToWebApp()
                    ))}
            </>
        </HelmetProvider>
    );
};

export default BookAppointment;
