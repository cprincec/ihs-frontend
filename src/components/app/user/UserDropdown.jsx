import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { active } from "../../../data/enums";
import usePatch from "../../../hooks/usePatch";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import TopBarProgress from "react-topbar-progress-indicator";
import ActionModal from "../../shared/ActionModal";

export default function UserDropdown({ userDetails }) {
    const [toggleModal, setToggleModal] = useState();
    const [errMsg, setErrMsg] = useState(false);

    const clicked = () => {
        setToggleModal(true);
    };

    const deactivateUserMutation = usePatch();

    const deactivateUser = () => {
        deactivateUserMutation.mutate(
            {
                url: `/user/${userDetails.id}/deactivate`,
                body: { accountActive: active.False },
            },
            {
                onError: () => {
                    setErrMsg("Error deactivating user. Try again.");
                },
                onSuccess: () => {
                    setToggleModal(false);
                },
            }
        );
    };

    return (
        <>
            {deactivateUserMutation.isLoading && <TopBarProgress />}
            <p
                className={
                    errMsg
                        ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
                        : "absolute -left-[99999px]"
                }
                aria-live="assertive"
            >
                <span className="flex items-center">
                    <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
                    {errMsg}
                </span>
            </p>
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
                            <Menu.Item>
                                <div
                                    onClick={clicked}
                                    className="w-full text-[red] block px-4 py-3 text-sm hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                                >
                                    Deactivate User
                                </div>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>

                {toggleModal && (
                    <ActionModal
                        display={toggleModal}
                        setDisplay={setToggleModal}
                        actionHeader={"Are you sure you want to deactivate this user?"}
                        actionFunction={deactivateUser}
                    />
                )}
            </Menu>
        </>
    );
}
