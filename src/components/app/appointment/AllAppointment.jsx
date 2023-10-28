// import React, {useCallback, useEffect, useState} from 'react';
// import {Route, Routes} from "react-router-dom";
// import ViewAppointment from "./ViewAppointment";
// import useAuth from "../../../hooks/useAuth";
// import UpdateAppointment from "./UpdateAppointment";
// import AssignHealthWorker from "./AssignHealthWorker";
// import {Helmet, HelmetProvider} from "react-helmet-async";
// import UploadReport from "./UploadReport";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import TopBarProgress from "react-topbar-progress-indicator";
// import AllAppointmentsTable from "./AllAppointmentsTable";

// const Appointment = () => {
// 	return (
// 		<Routes>
// 			<Route index element={<ParentContent/>}/>
// 			<Route path="/viewappointment/:appointmentId" element={<ViewAppointment/>}/>
// 			<Route path="/allappointments" element={<AllAppointmentsTable/>}/>
// 			<Route path="/updateappointment/:appointmentId" element={<UpdateAppointment/>}/>
// 			<Route path="/assignworker/:appointmentId" element={<AssignHealthWorker/>}/>
// 			<Route path="/updateappointment/:appointmentId/uploadreport" element={<UploadReport/>}/>
// 		</Routes>
// 	);
// }

// const ParentContent = () => {
// 	const axiosPrivate = useAxiosPrivate();
// 	const {setAllAppointments} = useAuth();
// 	const [loading, setLoading] = useState(false);

// 	const getAllAppointments = useCallback(async () => {
// 		const response = await axiosPrivate.get("/admin/appointments");

// 		const appointmentList = response.data.data;
// 		setAllAppointments(appointmentList);
// 	}, [axiosPrivate, setAllAppointments]);

// 	useEffect(() => {
// 		setLoading(true)
// 		getAllAppointments();
// 		setLoading(false);
// 	}, [getAllAppointments]);

// 	return (
// 		<HelmetProvider>
// 			<>
// 				<Helmet>
// 					<title>View All Appointments | IHS Dashboard</title>
// 					<link rel="canonical" href="https://www.ihsmdinc.com/"/>
// 				</Helmet>
// 				<div className="lg:px-20 lg:py-4 md:px-10 p-3">
// 					{loading && <TopBarProgress/>}
// 					<div className="flex justify-between items-center my-5 lg:mt-10">
// 						<h2 className="md:text-2xl text-xl">All Appointments</h2>
// 					</div>
// 					<hr className="my-10"/>

// 					{/*	Mobile Appointment Table*/}
// 					<AllAppointmentsTable/>

// 				</div>
// 			</>
// 		</HelmetProvider>
// 	);
// };

// export default Appointment;

import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ViewAppointment from "./ViewAppointment";
import UpdateAppointment from "./UpdateAppointment";
import AssignHealthWorker from "./AssignHealthWorker";
import { Helmet, HelmetProvider } from "react-helmet-async";
import UploadReport from "./UploadReport";
import TopBarProgress from "react-topbar-progress-indicator";
import AllAppointmentsTable from "./AllAppointmentsTable";
import useFetch from "../../../hooks/useFetch";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const Appointment = () => {
  return (
    <Routes>
      <Route index element={<ParentContent />} />
      <Route
        path="/viewappointment/:appointmentId"
        element={<ViewAppointment />}
      />
      <Route path="/allappointments" element={<AllAppointmentsTable />} />
      <Route
        path="/updateappointment/:appointmentId"
        element={<UpdateAppointment />}
      />
      <Route
        path="/assignworker/:appointmentId"
        element={<AssignHealthWorker />}
      />
      <Route
        path="/updateappointment/:appointmentId/uploadreport"
        element={<UploadReport />}
      />
    </Routes>
  );
};

const ParentContent = () => {
  const [errMsg, setErrMsg] = useState(false);
  const { isLoading, isSuccess, data, isError, error } = useFetch(
    "/admin/appointments",
    "allAppointments"
  );

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>View All Appointments | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmdinc.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
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
          <div className="flex justify-between items-center my-5 lg:mt-10">
            <h2 className="md:text-2xl text-xl">All Appointments</h2>
          </div>
          <hr className="my-10" />

          {/*	Mobile Appointment Table*/}
          {isSuccess && <AllAppointmentsTable appointments={data} />}
        </div>
      </>
    </HelmetProvider>
  );
};

export default Appointment;
