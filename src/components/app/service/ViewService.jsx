import React, { useState } from "react";
import { ChevronLeftIcon, ClipboardCheckIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import useDelete from "../../../hooks/useDelete";
import ActionModal from "../../shared/ActionModal";
import PageHeading from "../../shared/PageHeading";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const ViewService = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [displayModal, setDisplayModal] = useState(false);
    const queryClient = useQueryClient();
    let serviceId = params.serviceId;

    const staleTime = 1000 * 60 * 5;
    const { isLoading, isSuccess, data } = useFetch(
        `/service/${serviceId}`,
        `service, ${serviceId}`,
        staleTime
    );

    const deleteServiceMutation = useDelete();

    const handleDeleteService = () => {
        deleteServiceMutation.mutate(`/admin/service/delete/${serviceId}`, {
            onSuccess: async () => {
                // refetch all services
                await queryClient.refetchQueries({ queryKey: ["allServices"] });
                queryClient.removeQueries({ queryKey: ["service", serviceId] });
                navigate("/servicess");
            },
        });
    };

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>View Service | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmia.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {isLoading && <TopBarProgress />}

                    <PageHeading
                        pageName={"Service Details"}
                        previousPageName={"Services"}
                        previousUrl={"/servicess"}
                        icon={ClipboardCheckIcon}
                    >
                        {isSuccess && (
                            <div className="pr-8">
                                <button
                                    className="px-4"
                                    onClick={() => {
                                        setDisplayModal(true);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </PageHeading>
                    <div className="flex">
                        <div className="flex-1">
                            <div className="mt-10 text-gray-600 md:text-xl text-md">
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">
                                        Name:{" "}
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                                        {data && data.name}
                                    </p>
                                </div>
                                <div className="grid grid-cols-4">
                                    <p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">
                                        Category:
                                    </p>
                                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">
                                        {data && data.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {displayModal && (
                        <ActionModal
                            display={displayModal}
                            setDisplay={setDisplayModal}
                            actionHeader={"Are you sure you want to delete this service?"}
                            actionMessage={"This action cannot be undone."}
                            actionFunction={handleDeleteService}
                        />
                    )}
                </div>
            </>
        </HelmetProvider>
    );
};

export default ViewService;
