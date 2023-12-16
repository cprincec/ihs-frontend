import { IdentificationIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HealthWorkerDropdown from "./HealthWorkerDropdown";
import { capitalizeString } from "../../../utils/capitalizeString";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import FormModal from "../../shared/FormModal";
import UpdateHealthWorkerForm from "./form/UpdateHealthWorkerForm";
import PageHeading from "../../shared/PageHeading";
import Spinner from "../SVGs/Spinner";

const ViewHealthWorker = () => {
    const params = useParams();
    const healthWorkerId = params.healthWorkerId;
    const [showUpdateHealthWorkerForm, setShowUpdateHealthWorkerForm] = useState(false);

    const { isLoading, isSuccess, data } = useFetch(
        `/worker/${healthWorkerId}`,
        `healthWorker, ${healthWorkerId}`
    );

    return (
        <HelmetProvider>
            <>
                {showUpdateHealthWorkerForm && (
                    <FormModal
                        showModal={showUpdateHealthWorkerForm}
                        setShowModal={setShowUpdateHealthWorkerForm}
                        targetForm={UpdateHealthWorkerForm}
                        successMessage={"Health worker updated successfully!"}
                    />
                )}
                <Helmet>
                    <title>View Health Worker | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmia.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    <PageHeading
                        pageName={"Health Worker Details"}
                        previousPageName={"Health Workers"}
                        previousUrl={"/healthworkers"}
                        icon={IdentificationIcon}
                    >
                        {isSuccess ? (
                            <HealthWorkerDropdown
                                healthWorkerDetails={data}
                                setShowUpdateHealthWorkerForm={setShowUpdateHealthWorkerForm}
                            />
                        ) : (
                            <Spinner className="mr-8" style={{ width: "2rem" }} />
                        )}
                    </PageHeading>

                    {isLoading ? (
                        <div className="w-full min-h-40 p-12 grid items-center">
                            <Spinner className="" style={{ width: "10%", margin: "2rem auto 0" }} />
                        </div>
                    ) : (
                        <div className="my-10 text-gray-600 grid md:grid-cols-2 gap-y-4 lg:max-w-[70%]">
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Full Name:</p>

                                <p className="lg:col-start-2">
                                    {capitalizeString(data.firstName)} {capitalizeString(data.lastName)}{" "}
                                </p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Email:</p>

                                <p className="lg:col-start-2">{data.email}</p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Phone Number: </p>

                                <p className="lg:col-start-2">{data.phone} </p>
                            </div>
                            <div className="flex space-x-4">
                                <p className="col-span-2 lg:col-span-1 font-semibold">Qualification: </p>
                                <p className="lg:col-start-2">{data.qualification} </p>
                            </div>
                        </div>
                    )}
                </div>
            </>
        </HelmetProvider>
    );
};

export default ViewHealthWorker;
