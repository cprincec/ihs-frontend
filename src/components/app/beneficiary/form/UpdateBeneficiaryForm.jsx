import { ErrorMessage, Field, Form, Formik } from "formik";
import usePost from "../../../../hooks/usePost";
import { addUserSchema } from "../../../../utils/formSchema";
import { useQueryClient } from "@tanstack/react-query";
import { appointmentStatus, userRoles } from "../../../../data/enums";
import { useState } from "react";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import useFetch from "../../../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { WATDateString } from "../../../../hooks/useFormatDate";
import { ClipboardCopyIcon } from "@heroicons/react/solid";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import { capitalizeString } from "../../../../utils/capitalizeString";
import Modal from "../../Modal";
import usePatch from "../../../../hooks/usePatch";

const UpdateBeneficiaryForm = ({ handleCancelClick, setFormSuccess }) => {
    const navigate = useNavigate();
    const params = useParams();
    const beneficiaryId = params.beneficiaryId;

    const [errMsg, setErrMsg] = useState("");
    const { isLoading, data, isError } = useFetch(
        `/user/beneficiary/${beneficiaryId}`,
        `beneficiary, ${beneficiaryId}`
    );
    const updateBeneficiaryMutation = usePatch();
    const queryclient = useQueryClient();

    const initialValues = {
        firstName: data?.firstName,
        lastName: data?.lastName,
        dob: data?.dob,
        relationship: data?.relationship,
        phone: data?.phone,
        address: data?.address,
        city: data?.city,
        state: data?.state,
    };

    const handleSubmit = async (values, action) => {
        // populate beneficiary data object
        const beneficiaryData = {
            firstName: values.firstName,
            lastName: values.lastName,
            dob: values.dob,
            relationship: values.relationship,
            phone: values.phone,
            address: values.address,
            city: values.city,
            state: values.state,
        };

        updateBeneficiaryMutation.mutate(
            {
                url: `/user/beneficiary/${beneficiaryId}`,
                body: beneficiaryData,
            },
            {
                onError: () => setErrMsg("Failed to update beneficiary"),
                onSuccess: () => {
                    queryclient.invalidateQueries(["beneficiaries"]);
                    queryclient.invalidateQueries([`beneficiary, ${beneficiaryId}`]);
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
                        <ClipboardCheckIcon className="md:w-14 w-8 text-ihs-green" />
                        <h2 className="md:text-xl font-semibold text-gray-800">Update Beneficiary</h2>
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
                            <div className="grid lg:grid-cols-2 gap-x-6 gap-y-3 mt-8 items-center">
                                <div className="grid transition">
                                    <label htmlFor="firstName">
                                        Firstname
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        autoComplete="true"
                                        placeholder="John"
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="firstName"
                                        component="div"
                                        className={`${
                                            errors.firstName ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="lastName">
                                        Lastname
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        autoComplete="true"
                                        placeholder="Doe"
                                        className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="lastName"
                                        component="div"
                                        className={`${
                                            errors.lastName ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="dob">
                                        Date of Birth
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        autoComplete="true"
                                        className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="dob"
                                        component="div"
                                        className={`${
                                            errors.date ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>

                                <div className="grid">
                                    <label htmlFor="relationship">
                                        Relationship
                                        <span className="text-red-600">*</span>
                                    </label>

                                    <Field
                                        as="select"
                                        name="relationship"
                                        id="relationship"
                                        className="max-w-full border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    >
                                        <option disabled={true} value="">
                                            Select Relationship
                                        </option>
                                        <option value="Brother">Brother</option>
                                        <option value="Sister">Sister</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Daughter">Daughter</option>
                                        <option value="Son">Son</option>
                                        <option value="Grandmother">Grandmother</option>
                                        <option value="Grandfather">Grandfather</option>
                                        <option value="Granddaughter">Granddaughter</option>
                                        <option value="Grandson">Grandson</option>
                                        <option value="Aunt">Aunt</option>
                                        <option value="Uncle">Uncle</option>
                                        <option value="Niece">Niece</option>
                                        <option value="Nephew">Nephew</option>
                                        <option value="Cousin">Cousin</option>
                                        <option value="Mother In-Law">Mother In-Law</option>
                                        <option value="Father In-Law">Father In-Law</option>
                                        <option value="Brother In-Law">Brother In-Law</option>
                                        <option value="Sister In-Law">Sister In-Law</option>
                                        <option value="Husband">Husband</option>
                                        <option value="Wife">Wife</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <ErrorMessage
                                        name="relationship"
                                        component="p"
                                        className={`${
                                            errors.relationship ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="phone">
                                        Phone Number
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="phone"
                                        name="phone"
                                        id="phone"
                                        autoComplete="true"
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className={`${
                                            errors.phone ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="address">
                                        Address
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="text"
                                        name="address"
                                        id="address"
                                        placeholder="123 Maple Street"
                                        autoComplete="true"
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="address"
                                        component="div"
                                        className={`${
                                            errors.address ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>
                                <div className="grid transition">
                                    <label htmlFor="city">
                                        City
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="text"
                                        name="city"
                                        id="city"
                                        placeholder="Ikeja"
                                        autoComplete="true"
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="city"
                                        component="div"
                                        className={`${
                                            errors.city ? "animate-fly-in-y" : "animate-fly-out-y"
                                        } text-red-500 text-xs mt-1 transition-all duration-500`}
                                    />
                                </div>

                                <div className="grid transition">
                                    <label htmlFor="state">
                                        State
                                        <span className=" transition text-red-600">*</span>
                                    </label>

                                    <Field
                                        type="text"
                                        name="state"
                                        id="state"
                                        placeholder="Lagos"
                                        autoComplete="true"
                                        className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                    />
                                    <ErrorMessage
                                        name="state"
                                        component="div"
                                        className={`${
                                            errors.city ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                    {updateBeneficiaryMutation.isLoading ? "Please wait..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default UpdateBeneficiaryForm;
