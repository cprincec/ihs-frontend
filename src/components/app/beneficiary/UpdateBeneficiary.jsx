import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, UserAddIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {Helmet, HelmetProvider} from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const UpdateBeneficiary = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const beneficiary = useParams();
	const beneficiaryId = beneficiary.beneficiaryId;

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [dob, setDob] = useState('');
	const [relationship, setRelationship] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('')

	useEffect(() => {
		setLoading(true)
		let isMounted = true;
		const controller = new AbortController();

		const getBeneficiaries = async () => {
			try {
				const response = await axiosPrivate.get(
					`/user/beneficiary/${beneficiaryId}`,
					{
						signal: controller?.signal
					});

				isMounted &&
				setFirstName(response.data.data.firstName);
				setLastName(response.data.data.lastName);
				setDob(response.data.data.dob);
				setRelationship(response.data.data.relationship);
				setEmail(response.data.data.email);
				setPhone(response.data.data.phone);
				setAddress(response.data.data.address);
				setCity(response.data.data.city);
				setState(response.data.data.state);
				setLoading(false);
			} catch (err){
				console.error(err)
			}
		}

		getBeneficiaries();

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
			await axiosPrivate.patch(`/user/beneficiary/${beneficiaryId}`,
				JSON.stringify({
					firstName, lastName, dob, relationship, email, phone, address, city, state}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true
				}
			);

			setFirstName('');
			setLastName('');
			setDob('');
			setRelationship('');
			setEmail('');
			setPhone('');
			setAddress('');
			setCity('');
			setState('');

			setLoading(false);
			// setSuccess(true);

			navigate(`/beneficiaries`);

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
		<HelmetProvider>
			<>
				<Helmet>
					<title>Update Beneficiary | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
					{loading && <TopBarProgress />}
					<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate("/beneficiaries")}>
						<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Beneficiaries</p>
					</button>
					<div className="flex md:justify-start justify-center md:items-start items-center">
						<div className="md:flex-1">

							<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
								<div className="flex">
									<UserAddIcon className="md:w-14 w-8 md:ml-10 ml-3" />
									<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Update Beneficiary</h3>
								</div>
							</div>

							<form className="my-16 space-y-0" onSubmit={handleUpdate}>

								<p className={errMsg ? "rounded-md p-4 mb-4 bg-ihs-green-shade-200 text-red-500 font-normal text-lg" : "absolute -left-[99999px]"} aria-live="assertive">{errMsg}</p>

								{/*First Name and last Name*/}
								<div className="flex md:flex-row flex-col">
									<div>
										<label htmlFor="firstName" className="block text-md font-medium text-gray-500">
											First Name
											<span className="text-red-600">*</span>
										</label>

										<div className="mt-1">
											<input
												type="text"
												id="firstName"
												required
												placeholder="John"
												autoComplete="current-firstName"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"
											/>
										</div>
									</div>

									<div className="md:ml-10 md:mt-0 mt-5">
										<label htmlFor="lastName" className="block text-md font-medium text-gray-500">
											Last Name
											<span className="text-red-600">*</span>
										</label>
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

								{/*DOB and Relationship*/}
								<div className="flex md:pt-10 pt-5 md:flex-row flex-col">
									<div>
										<label htmlFor="dob" className="block text-md font-medium text-gray-500">
											Date of birth
											<span className="text-red-600">*</span>
										</label>
										<div className="mt-1">
											<input
												type="date"
												id="dob"
												required
												autoComplete="current-dob"
												value={dob}
												onChange={(e) => setDob(e.target.value)}
												className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
										</div>
									</div>

									<div className="md:ml-10 md:mt-0 mt-5">
										<label htmlFor="relationship" className="block text-md font-medium text-gray-500">Relationship<span
											className="text-red-600">*</span></label>
										<div className="mt-1">
											<select
												id="relationship"
												required
												aria-required="true"
												value={relationship}
												onChange={(e) => setRelationship(e.target.value)}
												className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72">
												<option value="">Select Relationship</option>
												<option value="Brother">Brother</option>
												<option value="Sister">Sister</option>
												<option value="Mother">Mother</option>
												<option value="Father">Father</option>
												<option value="Daughter">Daughter</option>
												<option value="Son">Son</option>
												<option value="Grandmother">Grandmother</option>
												<option value="Grandfather">Grandfather</option>
												<option value="Granddaughter">Granddaughter</option>
												<option value="Grandson">Grandson</option>
												<option value="Aunt">Aunt</option>
												<option value="Uncle">Uncle</option>
												<option value="Niece">Niece</option>
												<option value="Nephew">Nephew</option>
												<option value="Cousin">Cousin</option>
												<option value="Mother In-Law">Mother In-Law</option>
												<option value="Father In-Law">Father In-Law</option>
												<option value="Brother In-Law">Brother In-Law</option>
												<option value="Sister In-Law">Sister In-Law</option>
												<option value="Husband">Husband</option>
												<option value="Wife">Wife</option>
												<option value="Other">Other</option>
											</select>
										</div>
									</div>
								</div>

								{/*Email and Phone Number*/}
								<div className="flex md:flex-row flex-col md:pt-10 pt-5 ">
									<div>
										<label htmlFor="email" className="block text-md font-medium text-gray-500">
											Email
										</label>
										<div className="mt-1">
											<input
												type="email"
												id="email"
												placeholder="johndoe@email.com"
												autoComplete="current-email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
										</div>
									</div>

									<div className="md:ml-10 md:mt-0 mt-5">
										<label htmlFor="phone" className="block text-md font-medium text-gray-500">
											Phone Number
											<span className="text-red-600">*</span>
										</label>
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

								{/*Address, City and State*/}
								<div className="flex md:flex-wrap md:flex-row flex-col md:pt-10 pt-5">
									<div>
										<label htmlFor="address" className="block text-md font-medium text-gray-500">
											Address
											<span className="text-red-600">*</span>
										</label>
										<div className="mt-1">
											<input
												type="text"
												id="address"
												required
												placeholder="123 Maple Street"
												autoComplete="current-address"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
												className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
										</div>
									</div>

									<div className="md:ml-10 md:mt-0 mt-5">
										<label htmlFor="city" className="block text-md font-medium text-gray-500">
											City
											<span className="text-red-600">*</span>
										</label>
										<div className="mt-1">
											<input
												type="text"
												id="city"
												required
												placeholder="Ikeja"
												autoComplete="current-city"
												value={city}
												onChange={(e) => setCity(e.target.value)}
												className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
										</div>
									</div>

									<div className="lg:ml-10 lg:mt-0 md:mt-10 mt-5">
										<label htmlFor="state" className="block text-md font-medium text-gray-500">
											State
											<span className="text-red-600">*</span>
										</label>
										<div className="mt-1">
											<input
												type="text"
												id="state"
												required
												placeholder="Lagos"
												autoComplete="current-state"
												value={state}
												onChange={(e) => setState(e.target.value)}
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
			</>
		</HelmetProvider>
	);
};

export default UpdateBeneficiary;