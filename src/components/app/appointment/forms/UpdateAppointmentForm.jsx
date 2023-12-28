import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { userRoles } from "../../../../data/enums";
import { useState } from "react";
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import { WATDateString } from "../../../../hooks/useFormatDate";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import usePatch from "../../../../hooks/usePatch";
import { useSelector } from "react-redux";
import { getKey } from "../../../../utils/mobilePreferences";
import formatDate from "../../../../utils/dateToString";
import { useParams } from "react-router-dom";

const UpdateAppointmentForm = ({ handleCancelClick, setFormSuccess }) => {
    const userType = useSelector((state) => state.auth.userAccess.userType);
    const appointmentId = useParams().appointmentId;

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
    const initialValues = {
        beneficiary: fetchAppointment.data[0]?.beneficiaryName,
        service: fetchAppointment.data[0]?.serviceName,
        date: formatDate(fetchAppointment.data[0]?.date),
        time: fetchAppointment.data[0]?.time,
        notes: fetchAppointment.data[0]?.notes,
    };

    const handleSubmit = async (values) => {
        let appointmentData = {
            beneficiary: values.beneficiary,
            service: values.service,
            date: WATDateString(values.date),
            time: values.time,
            notes: values.notes,
        };

        updateAppointmentMutation.mutate(
            {
                url: `/admin/appointment/${appointmentId}`,
                body: appointmentData,
            },
            {
                // onError: (error) => setErrMsg(error.message),
                onSuccess: () => {
                    invalidateAppointmentQueries();
                    setFormSuccess(true);
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
                        <h2 className="md:text-xl font-semibold text-gray-800">Update Appointment</h2>
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
                                    <label htmlFor="beneficiary">
                                        Beneficiary
                                        <span className=" transition text-red-600">*</span>
                                    </label>
                                    <Field
                                        name="beneficiary"
                                        id="beneficiary"
                                        disabled={true}
                                        className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="beneficiary"
                                        component="p"
                                        className={`${
                                            errors.beneficiary ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="service">
                                        Service
                                        <span className=" transition text-red-600">*</span>
                                    </label>
                                    <Field
                                        as="select"
                                        name="service"
                                        id="service"
                                        required={true}
                                        className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    >
                                        {fetchServices?.data?.length ? (
                                            fetchServices?.data?.map((service, index) => (
                                                <option key={index} value={service?.name}>
                                                    {service?.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No services at this time</option>
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name="service"
                                        component="p"
                                        className={`${
                                            errors.service ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                        updateAppointmentMutation.isLoading || Object.keys(errors).length > 0
                                    }
                                >
                                    {updateAppointmentMutation.isLoading ? "Please wait..." : "Update"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default UpdateAppointmentForm;
