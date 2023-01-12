import React, {useCallback, useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import AddService from "./AddService";
import ViewService from "./ViewService";
import ServiceTable from "./ServiceTable";
import {Helmet, HelmetProvider} from "react-helmet-async";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const Service = () => {
	return (
		<Routes>
			<Route index element={<ParentContent />} />
			<Route path="/addservice" element={<AddService />} />
			<Route path="/viewservice/:serviceId" element={<ViewService />} />
		</Routes>
	);
}

const ParentContent = () => {
	const {services, setServices} = useAuth();
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const [loading, setLoading] = useState();

	const getServices = useCallback( async () => {
		const response = await axiosPrivate.get(
			"/admin/service/all");
		setServices(response.data.data);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
			setLoading(true)
			getServices().then(() => {
				setLoading(false)
			});
	}, [getServices]);


	return (
		<HelmetProvider>
			{loading && <TopBarProgress />}
			<>
				<Helmet>
					<title>Services | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
				<div className="flex justify-between items-center md:mt-16 mt-20">
					<h2 className="md:text-2xl text-xl">All Services</h2>
					<button className="py-3 md:px-4 px-2" onClick={() => navigate('/servicess/addservice')}>Add Service</button>
				</div>

				<hr className="my-10"/>

				{/*Services Table*/}
				<ServiceTable services={services}/>
			</div>
			</>
		</HelmetProvider>

	);
};

export default Service;