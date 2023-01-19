import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, ClipboardCheckIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Modal from "../Modal";
import {Helmet, HelmetProvider} from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const ViewService = () => {
	const axiosPrivate = useAxiosPrivate();
	const service = useParams();
	const navigate = useNavigate();
	const {services} = useAuth();
	const [serviceDetails, setServiceDetails] = useState({})
	const [loading, setLoading] = useState(false);
	const [toggleModal, setToggleModal] = useState(false);

	const clicked = () => {
		setToggleModal(true)
	}

	useEffect(() => {
		const serviceId = service.serviceId;
		const filteredService = services.filter(service => service.id === serviceId);
		filteredService.length === 0 ? navigate(-1) : setServiceDetails(filteredService[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deleteService = async () => {
		setLoading(true);
		const serviceId = service.serviceId;
		try {
			await axiosPrivate.delete(
				`/admin/service/delete/${serviceId}`,
			);

			const updatedServices = services.filter(service => service.id !== serviceId);
			localStorage.setItem("services", JSON.stringify(updatedServices));
			navigate("/servicess");

		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}

	}

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>View Service | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
			{loading && <TopBarProgress />}
			<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate("/servicess")}>
				<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Services</p>
			</button>
			<div className="flex">
				<div className="flex-1">

					<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
						<div className="flex">
							<ClipboardCheckIcon className="md:w-14 w-8 md:ml-10 ml-3" />
							<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Service Details</h3>
						</div>

						<div className="pr-3">
							<button className="text-xl md:px-8 px-3" onClick={clicked}>Delete</button>
						</div>
					</div>

					<div className="mt-10 text-gray-600 md:text-xl text-md" >
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Name: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{serviceDetails?.name} </p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold px-10 col-start-1 md:col-span-1 col-span-2">Category: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{serviceDetails?.category} </p>
						</div>

					</div>
				</div>
			</div>
			{toggleModal && <Modal setToggleModal={setToggleModal} executeFunction={deleteService} message="Are you sure you want to delete this service? This action cannot be undone."/>}
		</div>
			</>
		</HelmetProvider>
	);
};

export default ViewService;