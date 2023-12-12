import { ErrorMessage, Field, Form, Formik } from "formik";
import usePost from "../../../../hooks/usePost";
import { addHealthWorkerSchema } from "../../../../utils/formSchema";
import { useQueryClient } from "@tanstack/react-query";

const AddHealthWorkerForm = ({ handleCancelClick, setFormSuccess }) => {
    const initialValues = { firstName: "", lastName: "", email: "", phone: "", qualification: "" };
    const queryClient = useQueryClient();
    const addHealthWorkerMutation = usePost();

    const handleSubmit = async (values, actions) => {
        let healthWorkerData = {};
        for (const key in values) {
            healthWorkerData[key] = values[key];
        }

        addHealthWorkerMutation.mutate(
            {
                url: "/worker/create",
                body: healthWorkerData,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(["healthWorkers"]);
                    actions.resetForm();
                    setFormSuccess(true);
                },
            }
        );
    };

    return (
        <div>
            <div className="flex gap-x-2 items-center justify-between justify-items-center">
                <div className="flex items-center gap-x-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-12 h-12 text-ihs-green self-center"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                    </svg>
                    <h2 className="md:text-xl font-semibold text-gray-800">Add Health Worker</h2>
                </div>
                <span
                    className="mr-4 font-bold cursor-pointer text-xl text-[red] hover:text-ihs-green transition-all"
                    onClick={() => handleCancelClick()}
                >
                    ⨉
                </span>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={addHealthWorkerSchema}
                onSubmit={handleSubmit}
            >
                {({ errors }) => (
                    <Form className="grid gap-y-6">
                        <div className="grid lg:grid-cols-2 gap-x-6 gap-y-3 mt-8 items-start">
                            <div className="grid transition">
                                <label htmlFor="firstName">
                                    Firstname
                                    <span className=" transition text-red-600">*</span>
                                </label>

                                <Field
                                    autoFocus={true}
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
                                    className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
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
                                <label htmlFor="email">
                                    Email
                                    <span className=" transition text-red-600">*</span>
                                </label>

                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    autoComplete="true"
                                    placeholder="example@gmail.com"
                                    className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className={`${
                                        errors.email ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                <label htmlFor="qualification">
                                    Qualification
                                    <span className=" transition text-red-600">*</span>
                                </label>

                                <Field
                                    type="text"
                                    name="qualification"
                                    id="qualification"
                                    autoComplete="true"
                                    placeholder="Doctor"
                                    className="lg:min-w-[300px] transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage
                                    name="qualification"
                                    component="div"
                                    className={`${
                                        errors.qualification ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                {addHealthWorkerMutation.isLoading ? "Please wait..." : "Submit"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddHealthWorkerForm;
