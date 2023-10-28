// import { useCallback, useEffect, useState } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import BookAppointment from "./BookAppointment";
// import ViewAppointment from "./ViewAppointment";
// import ReviewAppointment from "./ReviewAppointment";
// import AppointmentTable from "./AppointmentTable";
// import { Helmet, HelmetProvider } from "react-helmet-async";
// import BookFollowUpAppointment from "./BookFollowUpAppointment";
// import BookAppointmentByAdmin from "./BookAppointmentByAdmin";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import useAuth from "../../../hooks/useAuth";
// import TopBarProgress from "react-topbar-progress-indicator";

// const Appointment = () => {
//   return (
//     <Routes>
//       <Route index element={<ParentContent />} />
//       <Route path="/bookappointment" element={<BookAppointment />} />
//       <Route
//         path="/viewappointment/:appointmentId"
//         element={<ViewAppointment />}
//       />
//       <Route path="/review/:appointmentId" element={<ReviewAppointment />} />
//       <Route
//         path="/bookfollowup/:beneficiaryId"
//         element={<BookFollowUpAppointment />}
//       />
//       <Route
//         path="/bookappointmentbyadmin/:beneficiaryId"
//         element={<BookAppointmentByAdmin />}
//       />
//     </Routes>
//   );
// };

// const ParentContent = () => {
//   const navigate = useNavigate();
//   const axiosPrivate = useAxiosPrivate();
//   const { setAppointments } = useAuth();

//   const [loading, setLoading] = useState(false);

//   const getAppointments = useCallback(async () => {
//     const response = await axiosPrivate.get("/user/appointments");

//     const appointmentList = response.data.data;
//     setAppointments(appointmentList);
//   }, [axiosPrivate, setAppointments]);

//   useEffect(() => {
//     console.log("Inside appointment");
//     setLoading(true);
//     getAppointments().then(() => {
//       setLoading(false);
//     });
//   }, [getAppointments]);

//   return (
//     <HelmetProvider>
//       <>
//         <Helmet>
//           <title>My Appointments | IHS Dashboard</title>
//           <link rel="canonical" href="https://www.ihsmdinc.com/" />
//         </Helmet>

//         <div className="lg:px-20 lg:py-4 md:px-10 p-3">
//           {loading && <TopBarProgress />}
//           <div className="xs:flex-col justify-center md:flex items-center md:justify-between my-5 lg:mt-10">
//             <h2 className="md:text-2xl text-xl py-2 md:py-2">
//               Your Appointments
//             </h2>
//             <div className="space-x-2">
//               <button
//                 className="py-3 md:px-4 px-2 text-sm"
//                 onClick={() => navigate("/appointments/bookappointment")}
//               >
//                 Book Appointment
//               </button>
//               <button
//                 className="py-3 md:px-4 px-2 text-sm"
//                 onClick={() => navigate("/beneficiaries/addbeneficiary")}
//               >
//                 Add Beneficiary
//               </button>
//             </div>
//           </div>

//           <hr className="my-10" />

//           {/*Appointments Table*/}
//           <AppointmentTable />
//         </div>
//       </>
//     </HelmetProvider>
//   );
// };

// export default Appointment;

import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import BookAppointment from "./BookAppointment";
import ViewAppointment from "./ViewAppointment";
import ReviewAppointment from "./ReviewAppointment";
import AppointmentTable from "./AppointmentTable";
import { Helmet, HelmetProvider } from "react-helmet-async";
import BookFollowUpAppointment from "./BookFollowUpAppointment";
import BookAppointmentByAdmin from "./BookAppointmentByAdmin";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

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
  const [errMsg, setErrMsg] = useState(false);

  const { isLoading, isSuccess, data, isError, error } = useFetch(
    "/user/appointments",
    "appointments"
  );

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
          {isSuccess && <AppointmentTable appointments={data} />}
        </div>
      </>
    </HelmetProvider>
  );
};

export default Appointment;
