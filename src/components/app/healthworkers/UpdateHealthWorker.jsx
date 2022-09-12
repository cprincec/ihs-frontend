import React, {useEffect, useState}  from 'react';
import {ChevronLeftIcon, IdentificationIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Spinner from "../Spinner";

const UpdateHealthWorker = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const healthWorker = useParams();
	const healthWorkerId = healthWorker.healthWorkerId;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [qualification, setQualification] = useState('');
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('')

	useEffect(() => {
		setLoading(true)
		let isMounted = true;
		const controller = new AbortController();

		const getHealthWorker = async () => {
			try {
				const response = await axiosPrivate.get(
					`/worker/${healthWorkerId}`,
					{
						signal: controller?.signal
					});

				isMounted &&
				setFirstName(response.data.data.firstName);
				setLastName(response.data.data.lastName);
				setEmail(response.data.data.email);
				setPhone(response.data.data.phone);
				setQualification(response.data.data.qualification);
				setLoading(false);
			} catch (err){
				console.error(err)
			}
		}

		getHealthWorker();

		return () => {
			isMounted = false;
			controller.abort();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	const handleUpdate = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axiosPrivate.patch(`/worker/${healthWorkerId}`,
				JSON.stringify({
					firstName, lastName, email, phone, qualification}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true
				}
			);

			setFirstName('');
			setLastName('');
			setEmail('');
			setPhone('');
			setQualification('')

			setLoading(false);
			// setSuccess(true);

			navigate(`/healthworkers`);

		} catch (err) {
			if (!err.response) {
				setErrMsg('No Server Response');
				setLoading(false);
			} else {
				setErrMsg(err)
				setLoading(false)
				console.error(err)
			}
		}
	}

	return (
		<div className="lg:p-20 md:p-10 p-3">
			{loading && <Spinner />}
				<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mb-20 md:mt-0 my-8" onClick={() => navigate("/healthworkers")}>
					<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to HealthWorkers</p>
				</button>
				<div className="flex md:justify-start justify-center md:items-start items-center">
					<div className="md:flex-1">

						<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
							<div className="flex">
								<IdentificationIcon className="md:w-14 w-8 md:ml-10 ml-3" />
								<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Update Health Worker</h3>
							</div>
						</div>

						<form className="my-16 space-y-0" onSubmit={handleUpdate}>

							<p className={errMsg ? "rounded-md p-4 mb-4 bg-ihs-green-shade-200 text-red-500 font-normal text-lg" : "absolute -left-[99999px]"} aria-live="assertive">{errMsg}</p>

							{/*First Name and last Name*/}
							<div className="flex md:flex-row flex-col">
								<div>
									<label htmlFor="firstName" className="block text-md font-medium text-gray-500">First Name <span
										className="text-red-600">*</span></label>
									<div className="mt-1">
										<input
											type="text"
											id="firstName"
											required
											placeholder="John"
											autoComplete="current-firstName"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
									</div>
								</div>

								<div className="md:ml-10 md:mt-0 mt-5">
									<label htmlFor="lastName" className="block text-md font-medium text-gray-500">Last Name<span
										className="text-red-600">*</span></label>
									<div className="md:mt-1">
										<input
											type="text"
											id="lastName"
											required
											placeholder="Doe"
											autoComplete="current-lastName"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
									</div>
								</div>
							</div>

							{/*Email and Phone Number*/}
							<div className="flex md:flex-row flex-col md:pt-10 pt-5 ">
								<div>
									<label htmlFor="email" className="block text-md font-medium text-gray-500">Email <span
										className="text-red-600">*</span></label>
									<div className="mt-1">
										<input
											type="email"
											id="email"
											required
											placeholder="johndoe@email.com"
											autoComplete="current-email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
									</div>
								</div>

								<div className="md:ml-10 md:mt-0 mt-5">
									<label htmlFor="phone" className="block text-md font-medium text-gray-500">Phone Number<span
										className="text-red-600">*</span></label>
									<div className="mt-1">
										<input
											type="tel"
											id="phone"
											required
											placeholder="Phone Number"
											autoComplete="current-phone"
											value={phone}
											onChange={(e) => setPhone(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
									</div>
								</div>
							</div>

							{/*Qualification*/}
							<div className="flex md:pt-10 pt-5 md:flex-row flex-col">
								<div>
									<label htmlFor="qualification" className="block text-md font-medium text-gray-500">Qualification <span
										className="text-red-600">*</span></label>
									<div className="mt-1">
										<input
											type="text"
											id="qualification"
											required
											autoComplete="current-qualification"
											value={qualification}
											onChange={(e) => setQualification(e.target.value)}
											className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
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
	);
};

export default UpdateHealthWorker;