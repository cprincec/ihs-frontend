import React, {useState, useEffect, useCallback} from 'react';
import {ChevronLeftIcon, ClipboardCopyIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import {appointmentStatus, userRoles} from "../../../data/enums";
import {Helmet, HelmetProvider} from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const UpdateAppointment = () => {
	const appointment = useParams();
	const appointmentId = appointment.appointmentId;
	const {auth, services, setServices} = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const [beneficiaryName, setBeneficiaryName] = useState('');
	const [serviceId, setServiceId] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [loading, setLoading] = useState(false);
	const [completed, setCompleted] = useState(true);

	const getServices = useCallback( async () => {
		const response = await axiosPrivate.get(
			"/admin/service/all");
		setServices(response.data.data);
	}, [axiosPrivate, setServices]);

	useEffect(() => {
		setLoading(true)
		let isMounted = true;
		const controller = new AbortController();

		const getAppointment = async () => {
			try {
				const response = await axiosPrivate.get(
					`/admin/appointment/${appointmentId}`,
					{
						signal: controller?.signal
					});

				isMounted &&
				setCompleted(response.data.data[0].completed)
				setBeneficiaryName(response.data.data[0].beneficiaryName);
				setServiceId(response.data.data[0].serviceId);
				setDate(response.data.data[0].date);
				setTime(response.data.data[0].time);
				setLoading(false);
			} catch (err){
				console.error(err)
			}
		}

		getServices().then(() => {
			getAppointment();
		});

		return () => {
			isMounted = false;
			controller.abort();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// services is an array and serviceId is a singular service id to check against
	const getServiceName = () => {
		const filteredService = services.filter(service => service.id === serviceId);
		return filteredService[0].name;
	}
	const handleUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			//select service name
			await axiosPrivate.patch(`/admin/appointment/${appointmentId}`,
				JSON.stringify({
					serviceName: getServiceName(), serviceId, date, time, status: appointmentStatus.Confirmed}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true
				}
			)

			setBeneficiaryName('');
			setServiceId('');
			setDate('');
			setTime('');

			setLoading(false);
			// setSuccess(true);

			navigate('/allappointments')

		} catch (err) {
			if (!err.response) {
				console.error('No Server Response')
				setLoading(false);
			} else {
				console.error(err)
			}
		}
	}

	const handleCompleteAppointment = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axiosPrivate.patch(`/admin/appointment/${appointmentId}/complete`,
				JSON.stringify({
					status: appointmentStatus.Completed}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true
				}
			)

			setLoading(false);

			navigate('/allappointments');

		} catch (err) {
			if (!err.response) {
				console.error('No Server Response')
				setLoading(false);
			} else {
				console.error(err)
			}
		}
	}

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Update Appointment | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
				{loading && <TopBarProgress />}
				<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate(-1)}>
					<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back</p>
				</button>
				<div className="flex md:justify-start justify-center md:items-start items-center">
					<div className="md:flex-1">

						<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
							<div className="flex">
								<ClipboardCopyIcon className="md:w-14 w-8 md:ml-10 ml-3" />
								<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Update Appointment</h3>
							</div>
							{!completed &&
								<div className="flex md:flex-row flex-col items-center md:gap-x-2 pr-2">
									{auth?.userType === userRoles.Admin && (
										<>
											<button className="sm:text-xl text-sm px-3 my-2" onClick={handleCompleteAppointment}>Mark as Complete</button>
										</>
									)}
								</div>
							}


						</div>

						<form className="my-16 space-y-0" onSubmit={handleUpdate}>

							{/*Beneficiary*/}
							<div className="flex md:flex-row flex-col">

								<div>
									<label
										htmlFor="beneficiary"
										className="block text-md font-medium text-gray-500"
									>
										Beneficiary
										<span className="text-red-600">*</span>
									</label>
									<div className="mt-1">
										<input
											type="text"
											id="beneficiaryName"
											disabled
											aria-required="true"
											value={beneficiaryName}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"/>
									</div>
								</div>
							</div>

							{/*Service*/}
							<div className="flex md:pt-10 pt-5 md:flex-row flex-col">

								<div>
									<label
										htmlFor="service"
										className="block text-md font-medium text-gray-500"
									>
										Service
										<span className="text-red-600">*</span>
									</label>
									<div className="mt-1">
										<select
											id="service"
											required
											aria-required="true"
											value={serviceId}
											onChange={(e) => setServiceId(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 w-96">
											<option value="">Select a service</option>
											{services?.length
												?
												services.map((service, index) => (
													<option
														key={index}
														value={service?.id}
													>
														{service?.name}
													</option>
												))
												:
												<option value="">No services at this time</option>
											}
										</select>
									</div>
								</div>

							</div>

							{/*Date and Time*/}
							<div className="flex md:flex-wrap md:flex-row flex-col md:pt-10 pt-5 ">
								<div>
									<label
										htmlFor="date"
										className="block text-md font-medium text-gray-500"
									>
										Date
										<span className="text-red-600">*</span>
									</label>
									<div className="mt-1">
										<input
											type="date"
											id="date"
											required
											autoComplete="current-date"
											aria-required="true"
											value={date}
											onChange={(e) => setDate(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"/>
									</div>
								</div>

								<div className="lg:ml-10 lg:mt-0 md:mt-0 md:ml-10 mt-5">
									<label
										htmlFor="time"
										className="block text-md font-medium text-gray-500"
									>
										Time
										<span className="text-red-600">*</span>
									</label>
									<div className="mt-1">
										<input
											type="time"
											id="time"
											required
											autoComplete="current-time"
											aria-required="true"
											value={time}
											onChange={(e) => setTime(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"/>
									</div>
								</div>

							</div>
							<div className="flex justify-start">
								<button type="submit" className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg">
									Update
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			</>
		</HelmetProvider>
	);
};

export default UpdateAppointment;