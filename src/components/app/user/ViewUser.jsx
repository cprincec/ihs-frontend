import { UserIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import ViewUserBeneficiaries from "./ViewUserBeneficiaries";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UserDropdown from "./UserDropdown";
import { capitalizeString } from "../../../utils/capitalizeString";
import useFetch from "../../../hooks/useFetch";
import { Suspense, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import PageHeading from "../../shared/PageHeading";
import Spinner from "../SVGs/Spinner";

const ViewUser = () => {
    const params = useParams();
    const userId = params.userId;
    const [errMsg, setErrMsg] = useState("");

    const { isLoading, isSuccess, data, isError } = useFetch(`/user/${userId}`, `user, ${userId}`);

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>View User | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>
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
                    <PageHeading
                        pageName={"User Details"}
                        previousPageName={"Users"}
                        previousUrl={"/users"}
                        icon={UserIcon}
                    >
                        {isSuccess ? (
                            <UserDropdown userDetails={data} />
                        ) : (
                            <Spinner className="mr-8" style={{ width: "2rem" }} />
                        )}
                    </PageHeading>

                    {isLoading ? (
                        <div className="w-full min-h-40 p-12 grid items-center">
                            <Spinner className="" style={{ width: "10%", margin: "2rem auto 0" }} />
                        </div>
                    ) : (
                        <div className="my-10 text-gray-600 grid md:grid-cols-2 gap-y-4">
                            <div className="flex space-x-4">
                                <p className="pcol-span-2 lg:col-span-1 font-semibold">Full Name: </p>
                                <p className="lg:col-start-2">
                                    {capitalizeString(data?.firstName)} {capitalizeString(data?.lastName)}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Email: </p>
                                <p className="lg:col-start-2">{data?.email}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Phone: </p>
                                <p className="lg:col-start-2">data?.phone}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold ">Role: </p>
                                <p className="lg:col-start-2 capitalize">{data?.userType}</p>
                            </div>
                        </div>
                    )}
                    <hr className="my-10" />

                    <div className="flex justify-between items-center mt-10">
                        <h2 className="md:text-2xl text-xl">Beneficiaries</h2>
                    </div>

                    <Suspense
                        fallback={
                            <div className="w-full min-h-40 p-6 grid items-center">
                                <Spinner className="" style={{ width: "10%", margin: "0 auto" }} />
                            </div>
                        }
                    >
                        <ViewUserBeneficiaries />
                    </Suspense>
                </div>
            </>
        </HelmetProvider>
    );
};

export default ViewUser;
