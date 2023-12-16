import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { appointmentStatus, userRoles } from "../../../../data/enums";
import { useState } from "react";
import { useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import { capitalizeString } from "../../../../utils/capitalizeString";
import { getKey } from "../../../../utils/mobilePreferences";
import usePatch from "../../../../hooks/usePatch";
import { useSelector } from "react-redux";
import formatDate from "../../../../utils/dateToString";

const AssignHealthWorkerForm = ({ handleCancelClick, setFormSuccess }) => {
    const appointmentId = useParams().appointmentId;

    const [mobileAuth, setMobileAuth] = useState("");
    const [errMsg, setErrMsg] = useState(false);

    const userType = useSelector((state) => state.auth.userAccess.userType);

    const fetchHealthWorkers = useFetch("/worker/all", "healthWorkers");
    const fetchAppointment = useFetch(
        `${
            (mobileAuth?.userType || userType) === userRoles.User
                ? `/user/appointments/${appointmentId}`
                : `/admin/appointment/${appointmentId}`
        }`,
        `appointment, ${appointmentId}`
    );
    const assignHealthWorkerMutation = usePatch();
    const queryClient = useQueryClient();
    console.log(fetchAppointment.data[0]);
    const initialValues = {
        beneficiary: fetchAppointment.data[0].beneficiaryName,
        service: fetchAppointment.data[0].serviceName,
        healthWorker: fetchAppointment.data[0].healthWorkerId ? fetchAppointment.data[0].healthWorkerId : "",
        date: formatDate(fetchAppointment.data[0].date),
        time: fetchAppointment.data[0].time,
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

    const handleSubmit = (values) => {
        const healthWorkerId = values.healthWorker;

        const filteredHealthWorker = fetchHealthWorkers.data.filter(
            (healthWorker) => healthWorker.id === healthWorkerId
        );
        const healthWorkerName =
            capitalizeString(filteredHealthWorker[0].firstName) +
            " " +
            capitalizeString(filteredHealthWorker[0].lastName);

        assignHealthWorkerMutation.mutate(
            {
                url: `/admin/appointment/${appointmentId}`,
                body: {
                    healthWorkerId,
                    healthWorkerName,
                    status: appointmentStatus.Confirmed,
                },
            },
            {
                // onError: (error) => setErrMsg(error.message),
                onSuccess: () => {
                    queryClient.invalidateQueries(["allAppointments"]);
                    queryClient.invalidateQueries(["appointments"]);
                    queryClient.invalidateQueries([`appointment, ${appointmentId}`]);
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
                        <h2 className="md:text-xl font-semibold text-gray-800">Assign Health Worker</h2>
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
                                        required={true}
                                        disabled={true}
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
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
                                        name="service"
                                        id="service"
                                        required={true}
                                        disabled={true}
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="service"
                                        component="p"
                                        className={`${
                                            errors.service ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="healthWorker">
                                        Health Worker
                                        <span className=" transition text-red-600">*</span>
                                    </label>
                                    <Field
                                        as="select"
                                        name="healthWorker"
                                        id="healthWorker"
                                        required={true}
                                        className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 text-black rounded-md focus:outline-none focus:ring-1"
                                    >
                                        <option disabled={true} value="">
                                            Select a Health Worker
                                        </option>
                                        {fetchHealthWorkers?.data?.length ? (
                                            fetchHealthWorkers?.data?.map((healthWorker, index) => (
                                                <option key={index} value={healthWorker?.id}>
                                                    {capitalizeString(healthWorker?.firstName)}{" "}
                                                    {capitalizeString(healthWorker?.lastName)}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">No available health worker</option>
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name="service"
                                        component="p"
                                        className={`${
                                            errors.healthWorker ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                        disabled
                                        className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
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
                                        disabled
                                        className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="time"
                                        component="div"
                                        className={`${
                                            errors.time ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                        assignHealthWorkerMutation.isLoading || Object.keys(errors).length > 0
                                    }
                                >
                                    {assignHealthWorkerMutation.isLoading ? "Please wait..." : "Assign"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};
export default AssignHealthWorkerForm;
