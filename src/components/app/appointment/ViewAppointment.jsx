import React, {useCallback, useEffect, useState} from 'react';
import {ChevronLeftIcon, ClipboardCheckIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {userRoles} from "../../../data/enums";
import { StarRating } from 'react-star-rating-element';
import {Helmet, HelmetProvider} from "react-helmet-async";
import AppointmentDropdown from "./AppointmentDropdown";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import TopBarProgress from "react-topbar-progress-indicator";
import {getDate} from "../../../hooks/useFormatDate";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const ViewAppointment = () => {
	const axiosPrivate = useAxiosPrivate();
	const appointment = useParams();
	const appointmentId = appointment.appointmentId;
	const navigate = useNavigate();
	const {auth} = useAuth();
	const [appointmentDetails, setAppointmentDetails] = useState({});
	const [loading, setLoading] = useState(false);

	const download = () => {
			window.open(appointmentDetails.reportUrl,"_blank");
	}

	const getAppointment = useCallback(async () => {
		if (auth?.userType === userRoles.User){
			const response = await axiosPrivate.get(`/user/appointments/${appointmentId}`);
			setAppointmentDetails(response.data.data[0])
		} else {
			const response = await axiosPrivate.get(`/admin/appointment/${appointmentId}`);
			setAppointmentDetails(response.data.data[0])
		}
	}, [appointmentId, axiosPrivate, auth?.userType])

	useEffect(() => {
		setLoading(true);
		getAppointment().then(() => {
			setLoading(false);
		});
	}, [getAppointment]);

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>View Appointment | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
					{loading && <TopBarProgress />}
					<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mb-20 md:mt-0 my-10" onClick={() => navigate(-1)}>
						<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Appointments</p>
					</button>
					<div className="flex">
						<div className="flex-1">

							<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
								<div className="flex">
									<ClipboardCheckIcon className="md:w-14 w-8 md:ml-10 ml-3" />
									<h3 className="md:text-2xl text-lg py-8 md:px-8 px-2">Appointments Details</h3>
								</div>

								<AppointmentDropdown appointmentDetails={appointmentDetails}/>

							</div>

							<div className="mt-10 text-gray-600 md:text-xl" >
								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Beneficiary: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.beneficiaryName} </p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Contact: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.beneficiaryPhone} </p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Service: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.serviceName} </p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Health Worker: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.healthWorkerName ? appointmentDetails?.healthWorkerName : "Unassigned"} </p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Date: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.date ? getDate(appointmentDetails?.date) : ""} </p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Time: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.time}</p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Status: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{appointmentDetails?.status}</p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Review: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{appointmentDetails?.review ? appointmentDetails?.review : "Unreviewed Appointment"} </p>
								</div>

								<div className="grid grid-cols-4 items-center">
									<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Rating: </p>

									<div className="py-5 md:ml-3 md:col-start-2 col-span-2">
										<StarRating
											ratingValue={appointmentDetails?.rating}
											starEmptyColor="#999999"
											starSpacing={5}
											starDimension={25}
											starRatedColor="#1eb7b8"
										/>
									</div>
								</div>

								{/*Report*/}
								{appointmentDetails?.reportUrl &&
									<div className="grid grid-cols-4 items-center">
										<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Report: </p>

											<button className="px-3 my-2" onClick={download}> Download</button>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
			</>
		</HelmetProvider>
	);
};

export default ViewAppointment;