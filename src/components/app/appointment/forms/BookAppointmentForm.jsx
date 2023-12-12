import { ErrorMessage, Field, Form, Formik } from "formik";
import usePost from "../../../../hooks/usePost";
import { useQueryClient } from "@tanstack/react-query";
import { appointmentStatus } from "../../../../data/enums";
import { useState } from "react";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { WATDateString } from "../../../../hooks/useFormatDate";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import { capitalizeString } from "../../../../utils/capitalizeString";
import ActionModal from "../../../shared/ActionModal";

const BookAppointmentForm = ({ handleCancelClick, setFormSuccess }) => {
    const initialValues = {
        beneficiary: "",
        service: "",
        date: "",
        time: "",
        notes: "",
    };
    const navigate = useNavigate();

    // const [errMsg, setErrMsg] = useState(false);
    const [platform, setPlatform] = useState("");
    const [displayRedirectModal, setDisplayRedirectModal] = useState(false);
    const [beneficiary, setBeneficiary] = useState({});

    const fetchBeneficiaries = useFetch("/user/beneficiaries", "beneficiaries");
    const fetchServices = useFetch("/admin/service/all", "allServices");
    const bookAppointmentMutation = usePost();
    const queryClient = useQueryClient();

    useEffect(() => {
        setPlatform(Capacitor.getPlatform());
    }, []);

    const redirectToWebApp = () => {
        window.alert("Visit the web app at https://app.ihsmdinc.com");
    };

    const handleSubmit = async (values) => {
        const appointmentData = {
            beneficiary: values.beneficiary,
            service: values.service,
            date: values.date,
            time: values.time,
            notes: values.notes,
        };

        // Find beneficiary of appointment by id
        const beneficiaryData = fetchBeneficiaries?.data?.filter(
            (ben) => ben.id === appointmentData.beneficiary
        );
        console.log(beneficiaryData);

        setBeneficiary(beneficiaryData[0]);

        // verify beneficiary coverage subscription
        if (beneficiaryData[0]?.subscription?.status === "active") {
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
                    // onError: (error) => setErrMsg(error),
                    onSuccess: () => {
                        queryClient.invalidateQueries(["appointments"]);
                        queryClient.invalidateQueries(["allAppointments"]);
                        setFormSuccess(true);
                    },
                }
            );
        } else {
            platform === "web" ? setDisplayRedirectModal(true) : redirectToWebApp();
        }
    };

    const redirectToPricingPage = (beneficiaryId) => {
        navigate(`/beneficiaries/updatebeneficiary/${beneficiaryId}/addhealthcoverage`);
    };

    return (
        <>
            <div>
                <div className="flex gap-x-2 items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        <ClipboardCheckIcon className="md:w-14 w-8 text-ihs-green" />
                        <h2 className="md:text-xl font-semibold text-gray-800">Book Appointment</h2>
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
                                        as="select"
                                        name="beneficiary"
                                        id="beneficiary"
                                        required={true}
                                        className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    >
                                        <option disabled={true} value="">
                                            Select Beneficiary
                                        </option>
                                        {fetchBeneficiaries?.data?.length ? (
                                            fetchBeneficiaries?.data?.map((beneficiary, index) => (
                                                <option key={index} value={beneficiary?.id}>
                                                    {capitalizeString(beneficiary?.firstName)}{" "}
                                                    {capitalizeString(beneficiary?.lastName)}
                                                </option>
                                            ))
                                        ) : (
                                            <option value="">You have no beneficiaries</option>
                                        )}
                                    </Field>
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
                                        className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
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
                                        autoComplete="true"
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
                                <div className="grid col-span-2 transition">
                                    <label htmlFor="notes">Notes</label>

                                    <Field
                                        as="textarea"
                                        name="notes"
                                        id="notes"
                                        autoComplete="true"
                                        className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
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
                                    className="transition flex-1 px-4 py-2 bg-gray-100 text-ihs-green md:text-base text-sm font-medium rounded-md"
                                    onClick={handleCancelClick}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="transition disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-base text-sm font-medium rounded-md bg-ihs-green"
                                >
                                    {bookAppointmentMutation.isLoading ? "Please wait..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            {displayRedirectModal && (
                <ActionModal
                    display={displayRedirectModal}
                    setDisplay={setDisplayRedirectModal}
                    actionMessage={`Do you want to add a health coverage for ${capitalizeString(
                        beneficiary?.firstName
                    )} ${capitalizeString(beneficiary?.lastName)}`}
                    actionHeader={`${capitalizeString(beneficiary?.firstName)} ${capitalizeString(
                        beneficiary?.lastName
                    )} has no health coverage`}
                    actionFunction={() => redirectToPricingPage(beneficiary?.id)}
                />
            )}
        </>
    );
};

export default BookAppointmentForm;
