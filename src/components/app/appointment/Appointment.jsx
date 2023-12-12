import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ViewAppointment from "./ViewAppointment";
import AppointmentTable from "./tables/AppointmentTable";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import FormModal from "../../shared/FormModal";
import BookAppointmentForm from "./forms/BookAppointmentForm";
import AddBeneficiaryForm from "../beneficiary/form/AddBeneficiaryForm";

const Appointment = () => {
    return (
        <Routes>
            <Route index element={<ParentContent />} />
            {/* <Route path="/bookappointment" element={<BookAppointment />} /> */}
            <Route path="/viewappointment/:appointmentId" element={<ViewAppointment />} />
            {/* <Route path="/review/:appointmentId" element={<ReviewAppointment />} /> */}
            {/* <Route path="/bookfollowup/:beneficiaryId" element={<BookFollowUpAppointment />} /> */}
            {/* <Route path="/bookappointmentbyadmin/:beneficiaryId" element={<BookAppointmentByAdmin />} /> */}
        </Routes>
    );
};

const ParentContent = () => {
    const [errMsg, setErrMsg] = useState(false);
    const [showBookAppointmentModal, setShowBookAppointmentModal] = useState(false);
    const [showAddBeneficiaryModal, setShowAddBeneficiaryModal] = useState(false);

    const { isLoading, isSuccess, data, isError, error } = useFetch("/user/appointments", "appointments");

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>My Appointments | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmdinc.com/" />
                </Helmet>

                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    {isLoading && <TopBarProgress />}
                    {isLoading && <TopBarProgress />}
                    {isError && setErrMsg(error.message)}
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
                    <div className="xs:flex-col justify-center md:flex items-center md:justify-between my-4 ">
                        <h2 className="md:text-2xl text-xl py-2 md:py-2">Your Appointments</h2>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <button
                                className="text-sm w-full md:w-[auto]"
                                onClick={() => setShowBookAppointmentModal(true)}
                            >
                                Book Appointment
                            </button>
                            <button
                                className="text-sm w-full md:w-[auto]"
                                onClick={() => setShowAddBeneficiaryModal(true)}
                            >
                                Add Beneficiary
                            </button>
                        </div>
                    </div>

                    <hr className="my-8" />

                    {showBookAppointmentModal && (
                        <FormModal
                            showModal={showBookAppointmentModal}
                            setShowModal={setShowBookAppointmentModal}
                            targetForm={BookAppointmentForm}
                            successMessage={"Appointment Booked Successfully!"}
                        />
                    )}
                    {showAddBeneficiaryModal && (
                        <FormModal
                            showModal={showAddBeneficiaryModal}
                            setShowModal={setShowAddBeneficiaryModal}
                            targetForm={AddBeneficiaryForm}
                            successMessage={"Beneficiary Added Successfully!"}
                        />
                    )}

                    {/*Appointments Table*/}
                    {isSuccess && <AppointmentTable appointments={data} />}
                </div>
            </>
        </HelmetProvider>
    );
};

export default Appointment;
