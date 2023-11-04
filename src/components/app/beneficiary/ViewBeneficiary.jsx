import React, { lazy, Suspense, useEffect, useState } from "react";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BeneficiaryDropdown from "./BeneficiaryDropdown";
import TopBarProgress from "react-topbar-progress-indicator";
import { timePeriod } from "../../../data/enums";
import { getDate } from "../../../hooks/useFormatDate";
import Shimmer from "../Shimmer";
import { capitalizeString } from "../../../utils/capitalizeString";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const ViewBeneficiaryAppointments = lazy(() => import("./ViewBeneficiaryAppointments"));

const ViewBeneficiary = () => {
    const beneficiary = useParams();
    const beneficiaryId = beneficiary.beneficiaryId;
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState("");
    const { isSuccess, isLoading, data, isError } = useFetch(
        `/user/beneficiary/${beneficiaryId}`,
        `beneficiary, ${beneficiaryId}`
    );

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const coverageEndDate = (timestamp) => {
        let date;
        date = new Date(timestamp * 1000);
        date = date.toDateString();

        return getDate(date);
    };

    const duration = (amount) => {
        switch (amount) {
            case 50:
                return "2 Weeks";
            case 100:
                return "1 Month";
            case 1200:
                return "1 Year";
            default:
                break;
        }
    };

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>View Beneficiary | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>

                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {isLoading && <TopBarProgress />}
                    {isError && setErrMsg("Failed to get beneficiary")}
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
                    <button
                        className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
                        onClick={() => navigate("/beneficiaries")}
                    >
                        <ChevronLeftIcon className="w-6" />{" "}
                        <p className="text-lg px-5">Back to Beneficiaries</p>
                    </button>
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                                <div className="flex">
                                    <UserCircleIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                                    <h3 className="md:text-3xl sm:text-2xl text-xl py-8 md:px-8 px-2">
                                        Beneficiary Details
                                    </h3>
                                </div>

                                {isSuccess && <BeneficiaryDropdown beneficiary={data} />}
                            </div>

                            <div className="my-10 ml-5 text-gray-600 md:text-xl text-md">
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Full Name:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? (
                                            <Shimmer />
                                        ) : (
                                            `${capitalizeString(data?.firstName)} ${capitalizeString(
                                                data?.lastName
                                            )}`
                                        )}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Date of Birth:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data?.dob ? getDate(data?.dob) : ""}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Relationship:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data ? data?.relationship : ""}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Phone Number:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data ? data?.phone : ""}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Address:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data ? data?.address : ""}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        City:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data ? data?.city : ""}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        State:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data ? data?.state : ""}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Coverage Status:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">
                                        {isLoading ? (
                                            <Shimmer />
                                        ) : data?.subscription ? (
                                            data.subscription.status
                                        ) : (
                                            "No Health Coverage"
                                        )}{" "}
                                    </p>
                                </div>
                                {isLoading ? (
                                    <Shimmer />
                                ) : (
                                    data?.subscription && (
                                        <>
                                            <div className="grid grid-cols-4">
                                                <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                                    Payment Frequency:{" "}
                                                </p>
                                                <p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">
                                                    {data?.subscription
                                                        ? duration(data.subscription.amount)
                                                        : ""}{" "}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-4">
                                                <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                                    Coverage End Date:{" "}
                                                </p>
                                                {/*31536000 is 1 */}
                                                <p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">
                                                    {data?.subscription
                                                        ? coverageEndDate(
                                                              data.subscription.startDate + timePeriod.year
                                                          )
                                                        : ""}{" "}
                                                </p>
                                            </div>
                                            {data?.subscription?.cancelAt !== null && (
                                                <div className="grid grid-cols-4">
                                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                                        Cancel Coverage On:{" "}
                                                    </p>
                                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">
                                                        {data?.subscription?.cancelAt
                                                            ? coverageEndDate(data.subscription.cancelAt)
                                                            : ""}{" "}
                                                    </p>
                                                </div>
                                            )}
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-10">
                        <h2 className="md:text-2xl text-xl">Appointments</h2>
                        <button
                            className="py-3 md:px-4 px-2"
                            onClick={() => navigate("/appointments/bookappointment")}
                        >
                            Book Appointment
                        </button>
                    </div>

                    <hr className="my-10" />
                    <Suspense fallback={<TopBarProgress />}>
                        <ViewBeneficiaryAppointments />
                    </Suspense>
                </div>
            </>
        </HelmetProvider>
    );
};

export default ViewBeneficiary;
