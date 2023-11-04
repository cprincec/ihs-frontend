import { ChevronLeftIcon, UserIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import ViewUserBeneficiaries from "./ViewUserBeneficiaries";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UserDropdown from "./UserDropdown";
import Shimmer from "../Shimmer";
import { capitalizeString } from "../../../utils/capitalizeString";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const ViewUser = () => {
    const params = useParams();
    const userId = params.userId;
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    const { isLoading, isSuccess, data, isError } = useFetch(`/user/${userId}`, `user, ${userId}`);

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>View User | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>
                {isLoading && <TopBarProgress />}
                {isError && setErrMsg("Failed to get user")}
                {/* Error Handling */}
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
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    <button
                        className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
                        onClick={() => navigate("/users")}
                    >
                        <ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Users</p>
                    </button>
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                                <div className="flex">
                                    <UserIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                                    <h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">User Details</h3>
                                </div>

                                {isSuccess && <UserDropdown userDetails={data} />}
                            </div>

                            <div className="my-10 ml-5 text-gray-600 text-md">
                                <div className="grid grid-cols-5">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Full Name:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? (
                                            <Shimmer />
                                        ) : (
                                            `${capitalizeString(data?.firstName)} ${capitalizeString(
                                                data?.lastName
                                            )}`
                                        )}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Email:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data?.email}`}{" "}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Phone:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {isLoading ? <Shimmer /> : `${data?.phone}`}
                                    </p>
                                </div>
                                <div className="grid grid-cols-5">
                                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                                        Role:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">
                                        {isLoading ? <Shimmer /> : `${data?.userType}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-10">
                        <h2 className="md:text-2xl text-xl">Beneficiaries</h2>
                    </div>

                    <hr className="my-10" />
                    <ViewUserBeneficiaries />
                </div>
            </>
        </HelmetProvider>
    );
};

export default ViewUser;
