import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormSuccessModal from "./FormSuccessModal";

const FormModal = ({ showModal, setShowModal, successMessage, targetForm: TargetForm, formProps }) => {
    // indicate when form in this modal is successful
    const [formSuccess, setFormSuccess] = useState(false);

    // close modal and set operation success to false
    const handleCancelClick = () => {
        setShowModal(false);
        setFormSuccess(false);
    };

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => {}}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
                    leave="ease-in duration-200"
                    leaveFrom="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity  backdrop-filter backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 overflow-y-auto md:py-4">
                    <div className="flex min-h-full items-center justify-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="mx-2 md:mx-20 lg:mx-0 relative transform overflow-hidden sm:rounded-lg bg-white px-6 py-8 shadow-xl transition-all w-full min-h-full sm:h-auto sm:max-h-[80%] lg:max-h-[100%] lg:min-w-[35%] lg:w-[auto]">
                                {formSuccess ? (
                                    <FormSuccessModal
                                        handleCancelClick={handleCancelClick}
                                        successMessage={successMessage}
                                    />
                                ) : (
                                    <TargetForm
                                        handleCancelClick={handleCancelClick}
                                        setFormSuccess={setFormSuccess}
                                        formProps={formProps}
                                    />
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default FormModal;
