import { ErrorMessage, Field, Form, Formik } from "formik";

const BaseForm = ({
    formTitle,
    initialValues,
    metaData,
    schema,
    onSubmit,
    handleCancelClick,
    formSuccess,
    successMessage,
    isLoading,
}) => {
    return (
        <div className="flex items-center bg-zinc-200 fixed w-full h-full inset-0 z-50">
            {formSuccess && (
                <div className="grid gap-y-4 sm:gap-y-6 py-4 px-6 items-center justify-items-center overflow-y-auto m-auto bg-white shadow rounded-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-12 h-12 text-ihs-green"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <h2 className="md:text-xl font-semibold text-gray-800 mt-[-.5rem]">{successMessage}</h2>

                    <button
                        className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
                        onClick={handleCancelClick}
                    >
                        Done
                    </button>
                </div>
            )}
            {!formSuccess && (
                <div className="overflow-y-auto p-6 w-full h-full sm:h-auto sm:max-h-[80%] sm:max-w-[60%] lg:max-w-[35%] m-auto bg-white shadow rounded-lg">
                    <div className="grid justify-items-center">
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
                        <h2 className="md:text-xl font-semibold text-gray-800">{formTitle}</h2>
                    </div>
                    <div className="">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={schema}
                            onSubmit={onSubmit}
                            validateOnChange={false}
                        >
                            {({ isSubmitting, errors }) => (
                                <Form className="grid gap-y-3 mt-8">
                                    {metaData.map((data, index) => {
                                        const { key, fieldTitle, placeHolder } = data;
                                        return (
                                            <div key={index} className="grid transition">
                                                <label htmlFor={key}>
                                                    {fieldTitle}
                                                    <span className=" transition text-red-600">*</span>
                                                </label>
                                                {!data.fieldType ? (
                                                    <Field
                                                        autoFocus={index === 0 ? true : false}
                                                        type="text"
                                                        name={key}
                                                        id={key}
                                                        autoComplete="true"
                                                        placeHolder=""
                                                        className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                                    />
                                                ) : data.fieldType === "select" ? (
                                                    <Field
                                                        as="select"
                                                        autoFocus={index === 0 ? true : false}
                                                        type="text"
                                                        name={key}
                                                        id={key}
                                                        autoComplete="true"
                                                        className="border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                                                    >
                                                        {
                                                            <option
                                                                disabled={true}
                                                                value=""
                                                                className="lowercase"
                                                            >
                                                                Select a service
                                                            </option>
                                                        }
                                                        {data.options.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option}>
                                                                    {option}
                                                                </option>
                                                            );
                                                        })}
                                                    </Field>
                                                ) : null}

                                                <ErrorMessage
                                                    name={key}
                                                    component="p"
                                                    className={`${
                                                        errors[key] ? "animate-fly-in-y" : "animate-fly-out-y"
                                                    } text-red-500 text-xs mt-1 transition-all duration-500`}
                                                />
                                            </div>
                                        );
                                    })}

                                    <div className="flex mt-2">
                                        <button
                                            className="transition flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ihs-green md:text-base text-sm font-medium rounded-md"
                                            onClick={handleCancelClick}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="transition disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-base text-sm font-medium rounded-md bg-ihs-green"
                                        >
                                            {isSubmitting ? "Please wait..." : "Submit"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </div>
    );
};
export default BaseForm;
