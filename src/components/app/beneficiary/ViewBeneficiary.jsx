import React, {useEffect, useState, lazy, Suspense, useCallback} from 'react';
import {ChevronLeftIcon, UserCircleIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import {Helmet, HelmetProvider} from "react-helmet-async";
import BeneficiaryDropdown from "./BeneficiaryDropdown";
import TopBarProgress from "react-topbar-progress-indicator";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {timePeriod} from "../../../data/enums";
import {getDate} from "../../../hooks/useFormatDate";
import Shimmer from "../Shimmer";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const ViewBeneficiaryAppointments = lazy(() => import('./ViewBeneficiaryAppointments'));

const ViewBeneficiary = () => {
	const axiosPrivate = useAxiosPrivate();
	const [beneficiaryDetails, setBeneficiaryDetails] = useState({});
	const beneficiary = useParams();
	const beneficiaryId = beneficiary.beneficiaryId;
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	const getBeneficiary = useCallback(async () => {
			const response = await axiosPrivate.get(`/user/beneficiary/${beneficiaryId}`);
			setBeneficiaryDetails(response.data.data);
	}, [beneficiaryId, axiosPrivate])

	useEffect(() => {
		setLoading(true);
		getBeneficiary().then(() => {
			setLoading(false);
		});
	}, [getBeneficiary]);

	const coverageEndDate = (timestamp) => {
		let date;
		date = new Date(timestamp * 1000);
		date = date.toDateString();

		return getDate(date);
	}

	const duration = (amount) => {

		switch (amount) {
			case 50:
				return "2 Weeks";
			case 100:
				return "1 Month";
			case 1200:
				return "1 Year";
			default:
				break;
		}
	}

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>View Beneficiary | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
					{loading && <TopBarProgress />}
					<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate("/beneficiaries")}>
						<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Beneficiaries</p>
					</button>
					<div className="flex">
						<div className="flex-1">
							<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
								<div className="flex">
									<UserCircleIcon className="md:w-14 w-8 md:ml-10 ml-3" />
									<h3 className="md:text-3xl sm:text-2xl text-xl py-8 md:px-8 px-2">Beneficiary Details</h3>
								</div>

								<BeneficiaryDropdown beneficiaryDetails={beneficiaryDetails} />
							</div>

							<div className="my-10 ml-5 text-gray-600 md:text-xl text-md" >
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Full Name: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails?.firstName} ${beneficiaryDetails?.lastName}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Date of Birth: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails?.dob ? getDate(beneficiaryDetails?.dob) : ""}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Relationship: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails ? beneficiaryDetails?.relationship : ""}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Phone Number: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails ? beneficiaryDetails?.phone : ""}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Address: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails ? beneficiaryDetails?.address : ""}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">City: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails ? beneficiaryDetails?.city : ""}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">State: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{loading ? <Shimmer /> : `${beneficiaryDetails ? beneficiaryDetails?.state : ""}`} </p>
								</div>
								<div className="grid grid-cols-4">
									<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Coverage Status: </p>
									<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{loading ? <Shimmer /> : beneficiaryDetails?.subscription ? beneficiaryDetails.subscription.status : "No Health Coverage"} </p>
								</div>
								{loading ? <Shimmer /> : beneficiaryDetails?.subscription && (
									<>
										<div className="grid grid-cols-4">
											<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Payment Frequency: </p>
											<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{beneficiaryDetails?.subscription ? duration(beneficiaryDetails.subscription.amount) : ""} </p>
										</div>
										<div className="grid grid-cols-4">
											<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Coverage End Date: </p>
											{/*31536000 is 1 */}
											<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{beneficiaryDetails?.subscription ? coverageEndDate(beneficiaryDetails.subscription.startDate + timePeriod.year) : ""} </p>
										</div>
										{beneficiaryDetails?.subscription?.cancelAt !== null &&  (
											<div className="grid grid-cols-4">
												<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Cancel Coverage On: </p>
												<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{beneficiaryDetails?.subscription?.cancelAt ? coverageEndDate(beneficiaryDetails.subscription.cancelAt) : ""} </p>
											</div>
										)}
									</>
								)}


							</div>
						</div>
					</div>
					<div className="flex justify-between items-center mt-10">
						<h2 className="md:text-2xl text-xl">Appointments</h2>
						<button className="py-3 md:px-4 px-2" onClick={() => navigate('/appointments/bookappointment')}>Book Appointment</button>
					</div>

					<hr className="my-10"/>
					<Suspense fallback={<TopBarProgress />}>
						<ViewBeneficiaryAppointments />
					</Suspense>
				</div>
			</>
		</HelmetProvider>
	);
};

export default ViewBeneficiary;