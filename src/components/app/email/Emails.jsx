import React, { useState, Fragment } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendBulkEmailSchema } from "../../../utils/formSchema";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import * as Yup from "yup";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { emailAuthorization } from "../../../data/enums";

const passcodeValidationSchema = Yup.object().shape({
  passcode: Yup.string().required("Passcode is required"),
});

const Emails = () => {
  const [emailsSent, setEmailsSent] = useState(false);
  const [authorized, setAuthorized] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const BULK_EMAIL_URL = "/sendBulkEmails";

  const handleSubmit = async (values, { resetForm }) => {
    const subject = values.subject;
    const message = values.message;

    try {
      const response = await axiosPrivate.post(
        BULK_EMAIL_URL,
        JSON.stringify({ subject, message }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      resetForm();
      setEmailsSent(true);

      return response;
    } catch (err) {
      console.log(`Error Message: ${err.message}`);
    }
  };

  return (
    <>
      {emailsSent ? (
        <p
          className={
            emailsSent
              ? "lg:mx-20 md:mx-10 mx-3 lg:mt-10 rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
              : "absolute -left-[99999px]"
          }
          aria-live="assertive"
        >
          <span className="flex items-center">
            <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
            Bulk email sent successfully
          </span>
        </p>
      ) : null}

      <div className="lg:px-20 lg:py-4 md:px-10 p-3">
        <div className="flex justify-between items-center my-5 lg:mt-5">
          <h2 className="md:text-2xl text-xl">Send Out Bulk Emails</h2>
        </div>
        <hr className="my-10" />

        {!authorized && (
          <EmailAuthorizationModal setAuthorized={setAuthorized} />
        )}
        <div className="container mx-auto mt-10">
          <Formik
            initialValues={{ subject: "", message: "" }}
            validationSchema={sendBulkEmailSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Email Subject
                    <span className="text-red-600">*</span>
                  </label>
                  <Field
                    id="subject"
                    name="subject"
                    type="text"
                    className={`focus:ring-ihs-green-shade-600 w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-xs mt-1 text-red-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-500 mb-2"
                  >
                    Email Body
                    <span className="text-red-600">*</span>
                  </label>
                  <Field
                    id="message"
                    name="message"
                    as="textarea"
                    rows={10}
                    className={` focus:ring-ihs-green-shade-600 
                          w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-xs mt-1 text-red-400"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting || Object.keys(errors).length > 0}
                    className="disabled:cursor-not-allowed disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none cursor-pointer flex-1 px-4 py-2 bg-ihs-green text-white md:text-lg text-sm font-medium rounded-md"
                  >
                    Send Emails
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Emails;

const EmailAuthorizationModal = ({ setAuthorized }) => {
  const [open, setOpen] = useState(true);
  const [revealPasscode, setRevealPasscode] = useState(false);
  const [authorizationError, setAuthorizationError] = useState("");

  const navigate = useNavigate();

  const togglePasscodeVisibility = () => {
    setRevealPasscode((revealPasscode) => !revealPasscode);
  };

  const handleAuthorization = async (values) => {
    if (values.passcode === emailAuthorization.PASSCODE) {
      setAuthorized(true);
      setOpen(false);
    } else {
      setAuthorizationError("Incorrect passcode");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className="flex flex-col space-y-8">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-medium text-center leading-6 text-gray-900"
                  >
                    Authorization Access
                  </Dialog.Title>

                  <p
                    className={
                      authorizationError.length > 0
                        ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
                        : "absolute -left-[99999px]"
                    }
                    aria-live="assertive"
                  >
                    <span className="flex items-center text-sm">
                      <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
                      {authorizationError}
                    </span>
                  </p>

                  <Formik
                    initialValues={{ passcode: "" }}
                    validationSchema={passcodeValidationSchema}
                    onSubmit={handleAuthorization}
                  >
                    {(errors, isSubmitting) => (
                      <Form className="flex flex-col">
                        <>
                          <div className="flex">
                            <Field
                              type={`${revealPasscode ? "text" : "password"}`}
                              placeholder="Enter passcode"
                              name="passcode"
                              id="passcode"
                              className="pl-4 pr-8 focus:ring-ihs-green-shade-600 w-full border border-gray-300 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1"
                            />
                            {revealPasscode ? (
                              <EyeOffIcon
                                className="w-4 -ml-6 text-gray-500 cursor-pointer"
                                onClick={togglePasscodeVisibility}
                              />
                            ) : (
                              <EyeIcon
                                className="w-4 -ml-6 text-gray-500 cursor-pointer"
                                onClick={togglePasscodeVisibility}
                              />
                            )}
                          </div>

                          <ErrorMessage
                            name="passcode"
                            component="div"
                            className="text-xs text-red-500 mt-1"
                          />
                        </>
                        <button
                          className="disabled:cursor-not-allowed disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none cursor-pointer flex-1 px-4 py-2 mt-4 bg-ihs-green text-white md:text-lg text-sm font-medium rounded-md"
                          type="submit"
                        >
                          {isSubmitting ? "Please wait..." : "Authorize"}
                        </button>
                      </Form>
                    )}
                  </Formik>

                  <p
                    className="mt-10 text-center hover:underline cursor-pointer"
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
