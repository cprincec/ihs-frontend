import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appointmentStatus, userRoles } from "../../../data/enums";
import { StarRating } from "react-star-rating-element";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AppointmentDropdown from "./AppointmentDropdown";
import { getDate } from "../../../hooks/useFormatDate";
import { useSelector } from "react-redux";
import { getKey } from "../../../utils/mobilePreferences";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import FormModal from "../../shared/FormModal";
import UpdateAppointmentForm from "./forms/UpdateAppointmentForm";
import BookFollowupAppointmentForm from "./forms/BookFollowupAppointmentForm";
import AssignHealthWorkerForm from "./forms/AssignHealthWorkerForm";
import ReviewAppointmentForm from "./forms/ReviewAppoinementForm";
import UploadReportForm from "./forms/UploadReportForm";
import PageHeading from "../../shared/PageHeading";
import Spinner from "../SVGs/Spinner";
import usePatch from "../../../hooks/usePatch";
import { useQueryClient } from "@tanstack/react-query";

const ViewAppointment = () => {
    const userType = useSelector((state) => state.auth.userAccess.userType);

    const params = useParams();
    const appointmentId = params.appointmentId;
    const [mobileAuth, setMobileAuth] = useState("");
    const [errMsg, setErrMsg] = useState(false);
    const [showUpdateAppointmentForm, setShowUpdateAppointmentForm] = useState(false);
    const [showBookFollowupAppointmentForm, setShowBookFollowupAppointmentForm] = useState(false);
    const [showAssignHealthWorkerForm, setShowAssignHealthWorkerForm] = useState(false);
    const [showReviewAppointmentForm, setShowReviewAppointmentForm] = useState(false);
    const [showUploadReportForm, setShowUploadReportForm] = useState(false);

    const download = () => {
        window.open(data[0]?.reportUrl, "_blank");
    };

    const { isLoading, isSuccess, data, isError, error } = useFetch(
        `${
            (mobileAuth?.userType || userType) === userRoles.User
                ? `/user/appointments/${appointmentId}`
                : `/admin/appointment/${appointmentId}`
        }`,
        `appointment, ${appointmentId}`
    );

    const completeAppointmentMutation = usePatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const completeAppointment = () => {
        completeAppointmentMutation.mutate(
            {
                url: `/admin/appointment/${appointmentId}/complete`,
                body: { status: appointmentStatus.Completed },
            },
            {
                onError: () => setErrMsg("Something went wrong"),
                onSuccess: () => {
                    queryClient.invalidateQueries(["allAppointments"]);
                    queryClient.invalidateQueries(["appointment"]);
                    queryClient.invalidateQueries([`appointment, ${appointmentId}`]);
                    navigate("/allappointments");
                },
            }
        );
    };

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

    return (
        <>
            {showUpdateAppointmentForm && (
                <FormModal
                    showModal={showUpdateAppointmentForm}
                    setShowModal={setShowUpdateAppointmentForm}
                    targetForm={UpdateAppointmentForm}
                    successMessage={"Appointment Updated Successfully!"}
                />
            )}
            {showBookFollowupAppointmentForm && (
                <FormModal
                    showModal={showBookFollowupAppointmentForm}
                    setShowModal={setShowBookFollowupAppointmentForm}
                    targetForm={BookFollowupAppointmentForm}
                    successMessage={"Appointment Booked Successfully!"}
                />
            )}
            {showAssignHealthWorkerForm && (
                <FormModal
                    showModal={showAssignHealthWorkerForm}
                    setShowModal={setShowAssignHealthWorkerForm}
                    targetForm={AssignHealthWorkerForm}
                    successMessage={"Health worker assigned successfully!"}
                />
            )}
            {showReviewAppointmentForm && (
                <FormModal
                    showModal={showReviewAppointmentForm}
                    setShowModal={setShowReviewAppointmentForm}
                    targetForm={ReviewAppointmentForm}
                    successMessage={"Review added successfully!"}
                />
            )}
            {showUploadReportForm && (
                <FormModal
                    showModal={showUploadReportForm}
                    setShowModal={setShowUploadReportForm}
                    targetForm={UploadReportForm}
                    successMessage={"Report uploaded successfully!"}
                />
            )}
            <HelmetProvider>
                <Helmet>
                    <title>View Appointment | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {isError && setErrMsg(error)}
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
                        pageName={"Appointment Details"}
                        previousPageName={"Appointments"}
                        previousUrl={"/allappointments"}
                    >
                        {isSuccess ? (
                            <AppointmentDropdown
                                appointmentDetails={data[0]}
                                setShowUpdateAppointmentForm={setShowUpdateAppointmentForm}
                                setShowBookFollowupAppointmentForm={setShowBookFollowupAppointmentForm}
                                setShowAssignHealthWorkerForm={setShowAssignHealthWorkerForm}
                                setShowReviewAppointmentForm={setShowReviewAppointmentForm}
                                setShowUploadReportForm={setShowUploadReportForm}
                                completeAppointment={completeAppointment}
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
                        <div className="my-10 text-gray-600 grid md:grid-cols-2 gap-y-4">
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Beneficiary:</p>
                                <p className="lg:col-start-2">{data[0]?.beneficiaryName}</p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Contact:</p>
                                <p className="lg:col-start-2">
                                    {data[0]?.beneficiaryPhone === "" ||
                                    data[0]?.beneficiaryPhone === undefined
                                        ? "No Contact Information"
                                        : data[0]?.beneficiaryPhone}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Service:</p>
                                <p className="lg:col-start-2">{`${data[0]?.serviceName}`}</p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Health Worker:</p>
                                <p className="lg:col-start-2">
                                    {data[0]?.healthWorkerName ? data[0]?.healthWorkerName : "Unassigned"}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Date:</p>
                                <p className="lg:col-start-2">
                                    {data[0]?.date ? getDate(data[0]?.date) : ""}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Time:</p>
                                <p className="lg:col-start-2">{data[0]?.time}</p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Status:</p>
                                <p className="lg:col-start-2 capitalize">{data[0]?.status}</p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Notes:</p>
                                <p className="lg:col-start-2">
                                    {data[0]?.notes === "" || data[0]?.notes === undefined
                                        ? "No Notes Available"
                                        : data[0].notes}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Review:</p>
                                <p className="lg:col-start-2">
                                    {data[0]?.review ? data[0]?.review : "Unreviewed Appointment"}
                                </p>
                            </div>

                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Rating:</p>
                                <div className="lg:col-start-2">
                                    {
                                        <StarRating
                                            ratingValue={data[0]?.rating}
                                            starEmptyColor="#999999"
                                            starSpacing={5}
                                            starDimension={25}
                                            starRatedColor="#1eb7b8"
                                        />
                                    }
                                </div>
                            </div>

                            {data && data[0]?.reportUrl && (
                                <div className="flex space-x-4 items-center">
                                    <p className="col-span-2 lg:col-span-1 font-semibold">Report: </p>

                                    <button className="lg:col-start-2 px-4" onClick={download}>
                                        {" "}
                                        Download
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </HelmetProvider>
        </>
    );
};

export default ViewAppointment;
