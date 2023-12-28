/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { userRoles } from "../../../data/enums";
import { useSelector } from "react-redux";
import { getKey } from "../../../utils/mobilePreferences";

export default function AppointmentDropdown({
    appointmentDetails,
    setShowUpdateAppointmentForm,
    setShowBookFollowupAppointmentForm,
    setShowAssignHealthWorkerForm,
    setShowReviewAppointmentForm,
    setShowUploadReportForm,
    completeAppointment,
}) {
    const [mobileAuth, setMobileAuth] = useState("");

    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const userType = useSelector((state) => state.auth.userAccess.userType);

    useEffect(() => {
        getKey("auth")
            .then((result) => {
                setMobileAuth(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <Menu as="div" className="relative inline-block text-left pr-4">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ihs-green focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span className="hidden md:inline">Options</span>
                    <ChevronDownIcon className="w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div>
                        {(mobileAuth?.userType || userType) === userRoles.Admin && (
                            <>
                                <Menu.Item>
                                    <div
                                        className="text-ihs-green block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => completeAppointment()}
                                    >
                                        Complete Appointment
                                    </div>
                                </Menu.Item>
                                <hr />
                            </>
                        )}
                        {loggedInUser?.id === appointmentDetails?.userId && (
                            <>
                                <Menu.Item>
                                    <div
                                        className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => setShowReviewAppointmentForm(true)}
                                    >
                                        Review Appointment
                                    </div>
                                </Menu.Item>
                                <hr />
                            </>
                        )}
                        {(mobileAuth?.userType || userType) === userRoles.Admin && (
                            <>
                                <Menu.Item>
                                    <div
                                        className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => setShowAssignHealthWorkerForm(true)}
                                    >
                                        Assign Health Worker
                                    </div>
                                </Menu.Item>
                                <hr />
                                <Menu.Item>
                                    <div
                                        className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => setShowBookFollowupAppointmentForm(true)}
                                    >
                                        Follow Up Appointment
                                    </div>
                                </Menu.Item>
                                <hr />
                            </>
                        )}

                        {(mobileAuth?.userType || userType) !== userRoles.User && (
                            <>
                                <Menu.Item>
                                    <div
                                        className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => setShowUpdateAppointmentForm(true)}
                                    >
                                        Update Appointment
                                    </div>
                                </Menu.Item>
                                <hr />
                                <Menu.Item>
                                    <div
                                        className="text-gray-700 block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                        onClick={() => setShowUploadReportForm(true)}
                                    >
                                        Upload Report
                                    </div>
                                </Menu.Item>
                                <hr />
                            </>
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
