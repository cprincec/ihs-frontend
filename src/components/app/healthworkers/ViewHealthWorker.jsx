import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, IdentificationIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {Helmet, HelmetProvider} from "react-helmet-async";
import HealthWorkerDropdown from "./HealthWorkerDropdown";

const ViewHealthWorker = () => {
	const [healthWorkerDetails, setHealthWorkerDetails] = useState({});
	const healthWorker = useParams();
	const navigate = useNavigate();
	const {healthWorkers} = useAuth();

	useEffect(() => {
		const healthWorkerId = healthWorker.healthWorkerId;
		const filteredHealthWorker = healthWorkers.filter(healthWorker => healthWorker.id === healthWorkerId);
		filteredHealthWorker.length === 0 ? navigate(-1) : setHealthWorkerDetails(filteredHealthWorker[0])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>View Health Worker | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
			<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate("/healthworkers")}>
				<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Health Workers</p>
			</button>
			<div className="flex">
				<div className="flex-1">
					<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
						<div className="flex">
							<IdentificationIcon className="md:w-14 w-8 md:ml-10 ml-3" />
							<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Health Worker Details</h3>
						</div>

						<HealthWorkerDropdown healthWorkerDetails={healthWorkerDetails}/>

					</div>

					<div className="my-10 ml-5 text-gray-600 md:text-xl text-md">
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Full Name: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{healthWorkerDetails?.firstName}  {healthWorkerDetails?.lastName} </p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Email: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{healthWorkerDetails?.email} </p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Phone Number: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{healthWorkerDetails?.phone} </p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Qualification: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{healthWorkerDetails?.qualification} </p>
						</div>

					</div>
				</div>
			</div>
		</div>
			</>
		</HelmetProvider>
	);
};

export default ViewHealthWorker;