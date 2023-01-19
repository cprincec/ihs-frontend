import React, {useState, useEffect} from 'react';
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {useNavigate} from "react-router-dom";
import {userRoles} from "../../../data/enums";
import {ChevronLeftIcon, UserAddIcon} from "@heroicons/react/outline";
import {Helmet, HelmetProvider} from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const ADD_EMPLOYEE = '/user/addEmployee';
const ADD_ADMIN = '/user/addAdmin';

const AddUser = () => {
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [dob, setDob] = useState('');
	const [role, setRole] = useState('')
	const [errMsg, setErrMsg] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setErrMsg('');
	}, [firstName, lastName, phone, email, password, role, dob, ])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (role === userRoles.Employee){
				await axiosPrivate.post(ADD_EMPLOYEE,
					JSON.stringify({ firstName, lastName, phone, email, password, role, dob }),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
					}
				);
			} else {
				await axiosPrivate.post(ADD_ADMIN,
					JSON.stringify({ firstName, lastName, phone, email, password, role, dob }),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
					}
				);
			}

			setLoading(false);

			//clear state and controlled inputs
			//need value attrib on inputs for this
			setFirstName('');
			setLastName('');
			setPassword('');
			setPhone('');
			setEmail('');
			setRole('');
			setDob('');
			setErrMsg('');

			setLoading(false);

			navigate("/users");
		} catch (err) {
			if (!err.response) {
				setErrMsg('No Server Response');
				setLoading(false);
			} else if (err.response.status === 500) {
				setErrMsg(err.response.data.message);
				setLoading(false);
			} else {
				setErrMsg('Error Adding User');
				setLoading(false);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Add Admin User | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
			{loading && <TopBarProgress />}
			<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate("/users")}>
				<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Users</p>
			</button>
			<div className="flex md:justify-start justify-center md:items-start items-center">
				<div className="md:flex-1">

					<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
						<div className="flex">
							<UserAddIcon className="md:w-14 w-8 md:ml-10 ml-3" />
							<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Add User</h3>
						</div>
					</div>

					<form className="my-16 space-y-0" onSubmit={handleSubmit}>

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

						{/*DOB and User Role*/}
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
								<label htmlFor="relationship" className="block text-md font-medium text-gray-500">User Role<span
									className="text-red-600">*</span></label>
								<div className="mt-1">
									<select
										id="relationship"
										required
										aria-required="true"
										value={role}
										onChange={(e) => setRole(e.target.value)}
										className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72">
										<option value="">Select a Role</option>
										<option value={userRoles.Employee}>Employee</option>
										<option value={userRoles.Admin}>Admin</option>
									</select>
								</div>
							</div>
						</div>

						{/*Email and Password*/}
						<div className="flex md:flex-row flex-col md:pt-10 pt-5 ">
							<div>
								<label htmlFor="email" className="block text-md font-medium text-gray-500">
									Email
									<span className="text-red-600">*</span>
								</label>
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
								<label htmlFor="phone" className="block text-md font-medium text-gray-500">
									Password
									<span className="text-red-600">*</span>
								</label>
								<div className="mt-1">
									<input
										type="password"
										id="password"
										required
										placeholder="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"/>
								</div>
							</div>
						</div>

						{/*Phone Number*/}
						<div className="flex md:flex-row flex-col md:pt-10 pt-5 ">
							<div className="">
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

						<div className="flex justify-start">
							<button
								className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
							>
								Submit
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

export default AddUser;