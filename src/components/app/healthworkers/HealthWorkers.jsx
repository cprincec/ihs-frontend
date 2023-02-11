import React, {useCallback, useState, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import ViewHealthWorker from "./ViewHealthWorker";
import AddHealthWorker from "./AddHealthWorker";
import UpdateHealthWorker from "./UpdateHealthWorker";
import HealthWorkerTable from "./HealthWorkerTable";
import {Helmet, HelmetProvider} from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import TopBarProgress from "react-topbar-progress-indicator";
import AddHealthWorkerModal from "./AddHealthWorkerModal";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const HealthWorkers = () => {
	return (
		<Routes>
			<Route index element={<ParentContent />} />
			<Route path="/viewhealthworker/:healthWorkerId" element={<ViewHealthWorker />} />
			<Route path="/addhealthworker" element={<AddHealthWorker />} />
			<Route path="/updatehealthworker/:healthWorkerId" element={<UpdateHealthWorker />} />
		</Routes>
	);
};

const ParentContent = () => {
	const axiosPrivate = useAxiosPrivate();
	const [loading, setLoading] = useState();
	const {healthWorkers, setHealthWorkers} = useAuth();

	const [showAddHealthWorkerModal, setShowAddHealthWorkerModal] = useState(false);
	const [addHealthWorkerModalSuccess, setAddHealthWorkerModalSuccess] = useState(false);

	const getHealthWorkers = useCallback(async () => {
		const response = await axiosPrivate.get(
			"/worker/all");

		setHealthWorkers(response.data.data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setLoading(true)
		getHealthWorkers()
		setLoading(false);

	}, [getHealthWorkers, addHealthWorkerModalSuccess]);

	const handleShowAddHealthWorkerModal = () => {
		setShowAddHealthWorkerModal(true);
	}

	return (
		<HelmetProvider>
			{loading && <TopBarProgress />}

			{/*	show modal if modal is toggled*/}
			{showAddHealthWorkerModal && <AddHealthWorkerModal
				setShowAddHealthWorkerModal={setShowAddHealthWorkerModal}
				addHealthWorkerModalSuccess={addHealthWorkerModalSuccess}
				setAddHealthWorkerModalSuccess={setAddHealthWorkerModalSuccess}
			/>}

			<>
				<Helmet>
					<title>View Health Workers | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
			{/*Users Section*/}
			<div className="flex justify-between items-center md:mt-16 mt-20">
				<h2 className="md:text-2xl text-xl">All Health Workers</h2>
				<button className="py-3 md:px-4 px-2" onClick={handleShowAddHealthWorkerModal}>Add Health Worker</button>
			</div>

			<hr className="my-10"/>

			{/*Health Workers Table*/}
			<HealthWorkerTable healthWorkers={healthWorkers}/>
		</div>
				</>
		</HelmetProvider>
	);
}

export default HealthWorkers;