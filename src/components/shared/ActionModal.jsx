import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ActionModal = ({ display, setDisplay, actionMessage, actionHeader, actionFunction }) => {
    return (
        <Transition.Root show={display} as={Fragment}>
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
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity backdrop-filter backdrop-blur-sm" />
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
                            <Dialog.Panel className="mx-2 md:mx-20 lg:mx-0 relative transform overflow-hidden sm:rounded-lg bg-white px-6 py-8 shadow-xl transition-all w-full min-h-full sm:h-auto sm:max-h-[80%] lg:max-h-[100%] lg:min-w-[35%] lg:max-w-[40%] lg:w-[auto] text-center">
                                <div className="grid px-4 items-center justify-items-center overflow-y-auto m-auto bg-white rounded-lg">
                                    <div className="inline-block mb-6 p-4 bg-ihs-green-shade-50 rounded-full">
                                        <svg
                                            className="w-12 h-12 fill-current text-ihs-green"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M0 0h24v24H0V0z" fill="none" />
                                            <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                                        </svg>
                                    </div>
                                    <h2 className="md:text-xl font-semibold text-gray-800 mt-[-.5rem]">
                                        {actionHeader}
                                    </h2>
                                    <p className="mt-2 md:text-xl text-gray-600 leading-relaxed">
                                        {actionMessage}
                                    </p>

                                    <div className="w-full flex items-center mt-6">
                                        <button
                                            className=" flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
                                            onClick={() => setDisplay(false)}
                                        >
                                            No
                                        </button>

                                        <button
                                            className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md"
                                            onClick={() => actionFunction()}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ActionModal;
