import {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import BookAppointment from "./BookAppointment";
import ViewAppointment from "./ViewAppointment";
import ReviewAppointment from "./ReviewAppointment";
import AppointmentTable from "./AppointmentTable";
import {Helmet, HelmetProvider} from "react-helmet-async";
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
			<Route path="/viewappointment/:appointmentId" element={<ViewAppointment />} />
			<Route path="/review/:appointmentId" element={<ReviewAppointment />} />
			<Route path="/bookfollowup/:beneficiaryId" element={<BookFollowUpAppointment />} />
			<Route path="/bookappointmentbyadmin/:beneficiaryId" element={<BookAppointmentByAdmin />} />
		</Routes>
	);
}

const ParentContent = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const {setAppointments} = useAuth();

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
		})
	}, [getAppointments]);

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>My Appointments | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>

				<div className="lg:p-20 md:p-10 p-3">
					{loading && <TopBarProgress/>}
					<div className="flex justify-between items-center md:mt-16 mt-20">
						<h2 className="md:text-2xl text-xl">Your Appointments</h2>
						<button className="py-3 md:px-4 px-2" onClick={() => navigate('/appointments/bookappointment')}>Book Appointment</button>
					</div>

					<hr className="my-10"/>

					{/*Appointments Table*/}
					<AppointmentTable />
				</div>
			</>
		</HelmetProvider>

	);
};

export default Appointment;