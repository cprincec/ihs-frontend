import { ErrorMessage, Field, Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import usePatch from "../../../../hooks/usePatch";

const ReviewAppointmentForm = ({ handleCancelClick, setFormSuccess }) => {
    const initialValues = {
        review: "",
        rating: "",
    };
    const [errMsg, setErrMsg] = useState(false);

    const reviewAppointmentMutation = usePatch();
    const queryClient = useQueryClient();
    const params = useParams();
    const appointmentId = params.appointmentId;

    const handleSubmit = async (values) => {
        reviewAppointmentMutation.mutate(
            {
                url: `/user/appointment/${appointmentId}/review`,
                body: {
                    review: values.review,
                    rating: values.rating,
                },
            },
            {
                onError: (error) => setErrMsg(error.message),
                onSuccess: () => {
                    queryClient.invalidateQueries([`appointment, ${appointmentId}`]);
                    queryClient.invalidateQueries(["appointments"]);
                    queryClient.invalidateQueries(["allAppointments"]);
                    setFormSuccess(true);
                },
            }
        );
    };

    return (
        <div>
            <div className="flex space-x-2 items-center justify-between">
                <div className="flex items-center space-x-2">
                    <ClipboardCheckIcon className="w-8 text-ihs-green" />
                    <h2 className="md:text-xl font-semibold text-gray-800">Review Appointment</h2>
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
                        <div className="grid gap-x-6 gap-y-3 mt-8 items-start">
                            <div className="grid transition">
                                <label htmlFor="rating">
                                    Rating
                                    <span className=" transition text-red-600">*</span>
                                </label>
                                <Field
                                    as="select"
                                    name="rating"
                                    id="rating"
                                    required={true}
                                    className="lg:min-w-[300px] max-w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                >
                                    <option value="">Rate your appointment</option>
                                    <option value="1">1 Star</option>
                                    <option value="2">2 Stars</option>
                                    <option value="3">3 Stars</option>
                                    <option value="4">4 Stars</option>
                                    <option value="5">5 Stars</option>
                                </Field>
                                <ErrorMessage
                                    name="rating"
                                    component="p"
                                    className={`${
                                        errors.rating ? "animate-fly-in-y" : "animate-fly-out-y"
                                    } text-red-500 text-xs mt-1 transition-all duration-500`}
                                />
                            </div>
                            <div className="grid transition">
                                <label htmlFor="review">Review</label>

                                <Field
                                    as="textarea"
                                    name="review"
                                    id="review"
                                    autoComplete="true"
                                    className="transition border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-1"
                                />
                                <ErrorMessage
                                    name="review"
                                    component="div"
                                    className={`${
                                        errors.review ? "animate-fly-in-y" : "animate-fly-out-y"
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
                                    reviewAppointmentMutation.isLoading || Object.keys(errors).length > 0
                                }
                            >
                                {reviewAppointmentMutation.isLoading ? "Please wait..." : "Add Review"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ReviewAppointmentForm;
