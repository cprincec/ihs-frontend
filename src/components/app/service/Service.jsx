import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ViewService from "./ViewService";
import ServiceTable from "./tables/ServiceTable";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import FormModal from "../../shared/FormModal";
import AddServiceForm from "./forms/AddServiceForm";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const Service = () => {
    return (
        <Routes>
            <Route index element={<ParentContent />} />
            <Route path="/viewservice/:serviceId" element={<ViewService />} />
        </Routes>
    );
};

const ParentContent = () => {
    const [showAddServiceModal, setShowAddServiceModal] = useState(false);

    const staleTime = 1000 * 60 * 5;
    const { isLoading, isSuccess, data } = useFetch("/admin/service/all", "allServices", staleTime);

    const handleShowAddServiceModal = () => {
        setShowAddServiceModal(true);
    };

    return (
        <HelmetProvider>
            {isLoading && <TopBarProgress />}

            {/*	show modal if modal is toggled*/}
            {showAddServiceModal && (
                <FormModal
                    showModal={showAddServiceModal}
                    setShowModal={setShowAddServiceModal}
                    targetForm={AddServiceForm}
                    successMessage={"Service Created Successfully"}
                />
            )}

            <>
                <Helmet>
                    <title>Services | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmia.com/" />
                </Helmet>
                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    <div className="flex justify-between items-center my-4">
                        <h2 className="md:text-2xl text-xl">All Services</h2>
                        <button className="py-3 md:px-4 px-2" onClick={handleShowAddServiceModal}>
                            Add Service
                        </button>
                    </div>

                    <hr className="my-8" />

                    {/*Services Table*/}
                    {isSuccess ? <ServiceTable services={data} /> : null}
                </div>
            </>
        </HelmetProvider>
    );
};

export default Service;
