import React, { useState } from "react";
import { ChevronLeftIcon, ClipboardCheckIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import { useQueryClient } from "@tanstack/react-query";
import useDelete from "../../../hooks/useDelete";

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const ViewService = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [toggleModal, setToggleModal] = useState(false);
  const queryClient = useQueryClient();
  let serviceId = params.serviceId;

  const staleTime = 1000 * 60 * 5;
  const { isLoading, data } = useFetch(
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
          <link rel="canonical" href="https://www.ihsmdinc.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {isLoading && <TopBarProgress />}
          <button
            className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
            onClick={() => navigate("/servicess")}
          >
            <ChevronLeftIcon className="w-6" />{" "}
            <p className="text-lg px-5">Back to Services</p>
          </button>
          <div className="flex">
            <div className="flex-1">
              <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                <div className="flex">
                  <ClipboardCheckIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                  <h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">
                    Service Details
                  </h3>
                </div>

                <div className="pr-3">
                  <button
                    className="text-xl md:px-8 px-3"
                    onClick={() => {
                      setToggleModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

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
          {toggleModal && (
            <Modal
              setToggleModal={setToggleModal}
              executeFunction={handleDeleteService}
              message="Are you sure you want to delete this service? This action cannot be undone."
            />
          )}
        </div>
      </>
    </HelmetProvider>
  );
};

export default ViewService;
