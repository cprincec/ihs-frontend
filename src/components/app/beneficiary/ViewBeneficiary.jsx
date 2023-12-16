import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BeneficiaryDropdown from "./BeneficiaryDropdown";
import { timePeriod } from "../../../data/enums";
import { getDate } from "../../../hooks/useFormatDate";
import { capitalizeString } from "../../../utils/capitalizeString";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import FormModal from "../../shared/FormModal";
import UpdateBeneficiaryForm from "./form/UpdateBeneficiaryForm";
import PageHeading from "../../shared/PageHeading";
import Spinner from "../SVGs/Spinner";

const ViewBeneficiaryAppointments = lazy(() => import("./ViewBeneficiaryAppointments"));

const ViewBeneficiary = () => {
    const params = useParams();
    const beneficiaryId = params.beneficiaryId;
    const navigate = useNavigate();

    const [errMsg, setErrMsg] = useState("");
    const [showUpdateBeneficiary, setShowUpdateBeneficiary] = useState(false);
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
        <>
            {showUpdateBeneficiary && (
                <FormModal
                    showModal={showUpdateBeneficiary}
                    setShowModal={setShowUpdateBeneficiary}
                    targetForm={UpdateBeneficiaryForm}
                    successMessage={"Beneficiary updated Successfully"}
                />
            )}
            <HelmetProvider>
                <Helmet>
                    <title>View Beneficiary | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>

                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
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

                    <PageHeading
                        pageName={"Beneficiary Details"}
                        previousPageName={"Beneficiaries"}
                        previousUrl={"/beneficiaries"}
                    >
                        {isSuccess ? (
                            <BeneficiaryDropdown
                                beneficiary={data}
                                setShowUpdateBeneficiary={setShowUpdateBeneficiary}
                            />
                        ) : (
                            <Spinner className="mr-8" style={{ width: "2rem" }} />
                        )}
                    </PageHeading>
                    {isLoading ? (
                        <div className="w-full min-h-40 p-6 grid items-center">
                            <Spinner className="" style={{ width: "10%", margin: "2rem auto 0" }} />
                        </div>
                    ) : (
                        <div className="my-10 text-gray-600 grid md:grid-cols-2 gap-y-4 ">
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Full Name: </p>
                                <p className="lg:col-start-2">
                                    {capitalizeString(data?.firstName)} {capitalizeString(data?.lastName)}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Date of Birth: </p>
                                <p className="lg:col-start-2">{data?.dob ? getDate(data?.dob) : ""}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Relationship: </p>
                                <p className="lg:col-start-2">{data ? data?.relationship : ""}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Phone Number: </p>
                                <p className="lg:col-start-2">{data ? data?.phone : ""}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Address: </p>
                                <p className="lg:col-start-2">{data ? data?.address : ""}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">City: </p>
                                <p className="lg:col-start-2">{data ? data?.city : ""}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">State: </p>
                                <p className="lg:col-start-2">{data ? data?.state : ""}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Coverage Status: </p>
                                <p className="lg:col-start-2 capitalize">
                                    {data?.subscription ? data.subscription.status : "No Health Coverage"}{" "}
                                </p>
                            </div>
                            {data?.subscription && (
                                <div className="flex space-x-4">
                                    <p className="col-span-2 lg:col-span-1 font-semibold">
                                        Payment Frequency:{" "}
                                    </p>
                                    <p className="lg:col-start-2">
                                        {data?.subscription ? duration(data.subscription.amount) : ""}{" "}
                                    </p>
                                </div>
                            )}

                            {data?.subscription && (
                                <div className="flex space-x-4">
                                    <p className="col-span-2 lg:col-span-1 font-semibold">
                                        Coverage End Date:{" "}
                                    </p>
                                    {/*31536000 is 1 */}
                                    <p className="lg:col-start-2">
                                        {data?.subscription
                                            ? coverageEndDate(data.subscription.startDate + timePeriod.year)
                                            : ""}{" "}
                                    </p>
                                </div>
                            )}
                            {data?.subscription && data?.subscription?.cancelAt !== null && (
                                <div className="flex space-x-4">
                                    <p className="col-span-2 lg:col-span-1 font-semibold">
                                        Cancel Coverage On:{" "}
                                    </p>
                                    <p className="lg:col-start-2">
                                        {data?.subscription?.cancelAt
                                            ? coverageEndDate(data.subscription.cancelAt)
                                            : ""}{" "}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    <hr className="my-10" />
                    {/* </div> */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="md:text-2xl text-lg">Appointments</h2>
                        <button
                            className="py-2 md:px-4 px-4"
                            onClick={() => navigate("/appointments/bookappointment")}
                        >
                            Book Appointment
                        </button>
                    </div>
                    <Suspense
                        fallback={
                            <div className="w-full min-h-40 p-6 grid items-center">
                                <Spinner className="" style={{ width: "10%", margin: "0 auto" }} />
                            </div>
                        }
                    >
                        <ViewBeneficiaryAppointments />
                    </Suspense>
                </div>
            </HelmetProvider>
        </>
    );
};

export default ViewBeneficiary;
