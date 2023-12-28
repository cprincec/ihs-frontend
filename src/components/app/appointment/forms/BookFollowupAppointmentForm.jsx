import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import { WATDateString } from "../../../../hooks/useFormatDate";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import usePost from "../../../../hooks/usePost";
import { appointmentStatus } from "../../../../data/enums";

const BookFollowupAppointmentForm = ({ handleCancelClick, setFormSuccess }) => {
    const appointmentId = useParams().appointmentId;
    const navigate = useNavigate();
    const bookAppointmentMutation = usePost();
    const queryClient = useQueryClient();
    const [errMsg, setErrMsg] = useState(false);

    const fetchAppointment = useFetch(`/admin/appointment/${appointmentId}`, `appointment, ${appointmentId}`);
    const fetchServices = useFetch("/admin/service/all", "services");

    const initialValues = {
        beneficiaryName: fetchAppointment.data[0]?.beneficiaryName,
        serviceId: "",
        date: "",
        time: "",
        notes: "",
    };

    const handleSubmit = async (values) => {
        let appointmentData = {
            serviceId: values.serviceId,
            date: WATDateString(values.date),
            time: values.time,
            notes: values.notes,
            userName: fetchAppointment.data[0]?.userName,
            beneficiaryId: fetchAppointment.data[0]?.beneficiaryId,
            userId: fetchAppointment.data[0]?.userId,
            status: appointmentStatus.Booked,
            beneficiaryName: fetchAppointment.data[0]?.beneficiaryName,
        };

        bookAppointmentMutation.mutate(
            { url: "/appointment/createfollowup", body: appointmentData },
            {
                // onError: () => {
                //     setErrMsg("Something went wrong. Try again");
                // },
                onSuccess: () => {
                    queryClient.invalidateQueries(["allAppointment"]);
                    queryClient.invalidateQueries(["appointments"]);
                    setFormSuccess(true);
                    navigate("/allappointments");
                },
            }
        );
    };

    return (
        <>
            <div>
                <div className="flex gap-x-2 items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        <ClipboardCheckIcon className="w-8 text-ihs-green" />
                        <h2 className="md:text-xl font-semibold text-gray-800">Book Follow-up Appointment</h2>
                    </div>
                    <span
                        className="mr-4 font-bold cursor-pointer text-xl text-[red] hover:text-ihs-green transition-all"
                        onClick={() => handleCancelClick()}
                    >
                        ⨉
                    </span>
                </div>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ errors }) => (
                        <Form className="grid gap-y-6">
                            <div className="grid lg:grid-cols-2 gap-x-6 gap-y-3 mt-8 items-start">
                                <div className="grid transition">
                                    <label htmlFor="beneficiaryName">
                                        Beneficiary
                                        <span className=" transition text-red-600">*</span>
                                    </label>
                                    <Field
                                        name="beneficiaryName"
                                        id="beneficiaryName"
                                        disabled={true}
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="beneficiaryName"
                                        component="p"
                                        className={`${
                                            errors.beneficiaryName ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="serviceId">
                                        Service
                                        <span className=" transition text-red-600">*</span>
                                    </label>
                                    <Field
                                        as="select"
                                        name="serviceId"
                                        id="serviceId"
                                        required={true}
                                        className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    >
                                        <option disabled={true} value="">
                                            Select a Service
                                        </option>
                                        {fetchServices?.data?.length ? (
                                            fetchServices?.data?.map((service, index) => (
                                                <option key={index} value={service?.id}>
                                                    {service?.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No services at this time</option>
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name="serviceId"
                                        component="p"
                                        className={`${
                                            errors.serviceId ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="date">
                                        Date
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="date"
                                        name="date"
                                        id="date"
                                        autoComplete="true"
                                        className="transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="date"
                                        component="div"
                                        className={`${
                                            errors.date ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>

                                <div className="grid transition">
                                    <label htmlFor="time">
                                        Time
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="time"
                                        name="time"
                                        id="time"
                                        autoComplete="true"
                                        className="transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="time"
                                        component="div"
                                        className={`${
                                            errors.time ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid lg:col-span-2 transition">
                                    <label htmlFor="notes">Notes</label>

                                    <Field
                                        as="textarea"
                                        name="notes"
                                        id="notes"
                                        autoComplete="true"
                                        className="transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="notes"
                                        component="div"
                                        className={`${
                                            errors.notes ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                            </div>
                            <div className="flex mt-2 gap-x-4">
                                <button
                                    className="transition flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ihs-green md:text-base text-sm font-medium rounded-md"
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="transition disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-base text-sm font-medium rounded-md bg-ihs-green"
                                    disabled={
                                        bookAppointmentMutation.isLoading || Object.keys(errors).length > 0
                                    }
                                >
                                    {bookAppointmentMutation.isLoading
                                        ? "Please wait..."
                                        : "Book Appointment"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default BookFollowupAppointmentForm;
