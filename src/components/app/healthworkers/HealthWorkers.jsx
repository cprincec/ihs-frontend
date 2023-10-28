import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ViewHealthWorker from "./ViewHealthWorker";
import UpdateHealthWorker from "./UpdateHealthWorker";
import HealthWorkerTable from "./HealthWorkerTable";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import AddHealthWorkerModal from "./AddHealthWorkerModal";
import useFetch from "../../../hooks/useFetch";

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const HealthWorkers = () => {
  return (
    <Routes>
      <Route index element={<ParentContent />} />
      <Route
        path="/viewhealthworker/:healthWorkerId"
        element={<ViewHealthWorker />}
      />
      <Route
        path="/updatehealthworker/:healthWorkerId"
        element={<UpdateHealthWorker />}
      />
    </Routes>
  );
};

const ParentContent = () => {
  const [showAddHealthWorkerModal, setShowAddHealthWorkerModal] =
    useState(false);
  const [addHealthWorkerModalSuccess, setAddHealthWorkerModalSuccess] =
    useState(false);

  const handleShowAddHealthWorkerModal = () => {
    setShowAddHealthWorkerModal(true);
  };

  const staleTime = 1000 * 60 * 5;
  const { isSuccess, data, isLoading, refetch } = useFetch(
    "/worker/all",
    "healthWorkers",
    staleTime
  );

  return (
    <HelmetProvider>
      {isLoading && <TopBarProgress />}

      {showAddHealthWorkerModal && (
        <AddHealthWorkerModal
          setShowAddHealthWorkerModal={setShowAddHealthWorkerModal}
          addHealthWorkerModalSuccess={addHealthWorkerModalSuccess}
          setAddHealthWorkerModalSuccess={setAddHealthWorkerModalSuccess}
          refetch={refetch}
        />
      )}

      <>
        <Helmet>
          <title>View Health Workers | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {/*Users Section*/}
          <div className="flex justify-between items-center my-5 lg:mt-10">
            <h2 className="md:text-2xl text-xl">All Health Workers</h2>
            <button
              className="py-3 md:px-4 px-2"
              onClick={handleShowAddHealthWorkerModal}
            >
              Add Health Worker
            </button>
          </div>

          <hr className="my-10" />

          {/*Health Workers Table*/}
          {isSuccess && <HealthWorkerTable healthWorkers={data} />}
        </div>
      </>
    </HelmetProvider>
  );
};

export default HealthWorkers;
