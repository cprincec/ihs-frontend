import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import BookAppointment from "./BookAppointment";
import ViewAppointment from "./ViewAppointment";
import ReviewAppointment from "./ReviewAppointment";
import AppointmentTable from "./AppointmentTable";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BookFollowUpAppointment from "./BookFollowUpAppointment";
import BookAppointmentByAdmin from "./BookAppointmentByAdmin";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";

const Appointment = () => {
  return (
    <Routes>
      <Route index element={<ParentContent />} />
      <Route path="/bookappointment" element={<BookAppointment />} />
      <Route
        path="/viewappointment/:appointmentId"
        element={<ViewAppointment />}
      />
      <Route path="/review/:appointmentId" element={<ReviewAppointment />} />
      <Route
        path="/bookfollowup/:beneficiaryId"
        element={<BookFollowUpAppointment />}
      />
      <Route
        path="/bookappointmentbyadmin/:beneficiaryId"
        element={<BookAppointmentByAdmin />}
      />
    </Routes>
  );
};

const ParentContent = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { setAppointments } = useAuth();

  const [loading, setLoading] = useState(false);

  const getAppointments = useCallback(async () => {
    const response = await axiosPrivate.get("/user/appointments");

    const appointmentList = response.data.data;
    setAppointments(appointmentList);
  }, [axiosPrivate, setAppointments]);

  useEffect(() => {
    setLoading(true);
    getAppointments().then(() => {
      setLoading(false);
    });
  }, [getAppointments]);

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>My Appointments | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>

        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {loading && <TopBarProgress />}
          <div className="xs:flex-col justify-center md:flex items-center md:justify-between my-5 lg:mt-10">
            <h2 className="md:text-2xl text-xl py-2 md:py-2">
              Your Appointments
            </h2>
            <div className="space-x-2">
              <button
                className="py-3 md:px-4 px-2 text-sm"
                onClick={() => navigate("/appointments/bookappointment")}
              >
                Book Appointment
              </button>
              <button
                className="py-3 md:px-4 px-2 text-sm"
                onClick={() => navigate("/beneficiaries/addbeneficiary")}
              >
                Add Beneficiary
              </button>
            </div>
          </div>

          <hr className="my-10" />

          {/*Appointments Table*/}
          <AppointmentTable />
        </div>
      </>
    </HelmetProvider>
  );
};

export default Appointment;
