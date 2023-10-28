import React, { useState } from "react";
import { ChevronLeftIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { appointmentStatus } from "../../../data/enums";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import Modal from "../Modal";
import useFetch from "../../../hooks/useFetch";
import Shimmer from "../Shimmer";
import { WATDateString } from "../../../hooks/useFormatDate";
import usePost from "../../../hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const BookFollowUpAppointment = () => {
    const navigate = useNavigate();
    const params = useParams();
    const beneficiaryId = params.beneficiaryId;

    const [toggleModal, setToggleModal] = useState(false);
    const [errMsg, setErrMsg] = useState(false);

    const clicked = () => {
        setToggleModal(true);
    };

    const fetchBeneficiary = useFetch(
        `/user/beneficiary/${beneficiaryId}`,
        `beneficiary, ${beneficiaryId}`
    );
    const fetchServices = useFetch("/admin/service/all", "services");
    const bookAppointmentMutation = usePost();
    const queryClient = useQueryClient();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(fetchBeneficiary.data.subscription?.status);

        if (fetchBeneficiary.data.subscription?.status !== "active") {
            clicked();
            return;
        }

        const formData = new FormData(e.target);
        let appointmentData = {
            // beneficiaryName field is diabled, hence the manual extraction of value
            userName: e.target.beneficiaryName.value,
            beneficiaryId: e.target.beneficiaryName.dataset.beneficiaryId,
            userId: e.target.beneficiaryName.dataset.beneficiaryId,
            status: appointmentStatus.Booked,
        };

        for (const [key, value] of formData) {
            appointmentData[key] = value;
        }

        // convert time to WAT
        appointmentData["date"] = WATDateString(e.target.date.value);

        bookAppointmentMutation.mutate(
            { url: "/appointment/createfollowup", body: appointmentData },
            {
                onError: (error) => {
                    setErrMsg("Something went wrong. Try again");
                },
                onSuccess: () => {
                    queryClient.invalidateQueries(["allAppointment"]);
                    queryClient.invalidateQueries(["appointments"]);
                    navigate("/allappointments");
                },
            }
        );
    };

    const redirectToPricingPage = () => {
        navigate(
            `/beneficiaries/updatebeneficiary/${beneficiaryId}/addhealthcoverage`
        );
    };

    const getBeneficiaryName = (firstName, lastName) => {
        let fName = firstName[0].toUpperCase() + firstName.substring(1);
        let lName = lastName[0].toUpperCase() + lastName.substring(1);
        return fName + " " + lName;
    };

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>Book Appointment | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {(fetchBeneficiary.isError || fetchServices.isError) &&
                        setErrMsg("Something went wrong")}
                    {(fetchBeneficiary.isLoading ||
                        fetchServices.isLoading ||
                        bookAppointmentMutation.isLoading) && (
                        <TopBarProgress />
                    )}

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

                    <button
                        className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
                        onClick={() => navigate("/allappointments")}
                    >
                        <ChevronLeftIcon className="w-6" />{" "}
                        <p className="text-lg px-5">Back to All Appointments</p>
                    </button>

                    <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                        <div className="flex">
                            <ClipboardCopyIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                            <h3 className="md:text-3xl text-lg py-8 md:px-8 px-2">
                                Book Follow Up Appointment
                            </h3>
                        </div>
                    </div>

                    <form className="my-16 space-y-0" onSubmit={handleSubmit}>
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
                                {fetchBeneficiary.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="beneficiaryName"
                                            name="beneficiaryName"
                                            required
                                            aria-required="true"
                                            data-beneficiary-id={
                                                fetchBeneficiary.data.id
                                            }
                                            defaultValue={getBeneficiaryName(
                                                fetchBeneficiary.data.firstName,
                                                fetchBeneficiary.data.lastName
                                            )}
                                            disabled
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
                                    htmlFor="serviceId"
                                    className="block text-md font-medium text-gray-500"
                                >
                                    Service
                                    <span className="text-red-600">*</span>
                                </label>
                                {fetchServices.isLoading ? (
                                    <Shimmer />
                                ) : (
                                    <div className="mt-1">
                                        <select
                                            id="serviceId"
                                            name="serviceId"
                                            required
                                            aria-required="true"
                                            className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 lg:w-96 md:w-72"
                                        >
                                            <option value="">
                                                Select a service
                                            </option>
                                            {fetchServices.data.length ? (
                                                fetchServices.data.map(
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
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
                                    />
                                </div>
                            </div>
                        </div>

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
                                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
                                    />
                                </div>
                            </div>
                        </div>

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
                                className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                {toggleModal && (
                    <Modal
                        setToggleModal={setToggleModal}
                        executeFunction={redirectToPricingPage}
                        message="Go Back?"
                        header={"Beneficiary has no health coverage"}
                    />
                )}
            </>
        </HelmetProvider>
    );
};

export default BookFollowUpAppointment;
