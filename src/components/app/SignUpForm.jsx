import React, { useRef, useState, useEffect } from 'react';

import axios from '../../api/axios';
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const REGISTER_URL = '/user/signup';
// const HEALTH_URL = '/users/all';

const SignUpForm = () => {
	const firstNameRef = useRef();
	const errRef = useRef();

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		firstNameRef.current.focus();
	}, [])

	useEffect(() => {
		setErrMsg('');
	}, [firstName, lastName, phone, email, password])

	useEffect(() => {
		if(loading) {
			// prevent page from interactive
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [loading]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post(REGISTER_URL,
				JSON.stringify({ firstName, lastName, phone, email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);
			setLoading(false);

			setSuccess(true);
			//clear state and controlled inputs
			//need value attrib on inputs for this
			setFirstName('');
			setLastName('');
			setPassword('');
			setPhone('');
			setEmail('');
		} catch (err) {
			if (!err.response) {
				setErrMsg('No Server Response');
				setLoading(false);
			} else if (err.response.status === 409) {
				setErrMsg(err.response.data.message);
				setLoading(false);
			} else {
				setErrMsg('Error Registering User');
				setLoading(false);
			}
			errRef.current.focus();
		}
	}

	return (
		<>
			{success ? (
				<section>
					<h1>You’ve been successfully registered.</h1>
					<p>Please check your email inbox (including junk/spam folder) to verify account.</p>
				</section>
			) : (
				<section>
					{loading && <TopBarProgress />}
					<p ref={errRef} className={errMsg ? "rounded-md p-4 mb-4 bg-ihs-green-shade-200 text-red-500 font-normal text-lg" : "absolute -left-[99999px]"} aria-live="assertive">{errMsg}</p>
					<form className="mb-0 space-y-0 relative" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
								First Name <span className="text-red-600">*</span>
							</label>
							<div className="mt-1">
								<input
									type="text"
									id="firstName"
									ref={firstNameRef}
									required
									placeholder="John"
									autoComplete="off"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mt-5">
								Last Name <span className="text-red-600">*</span>
							</label>
							<div className="mt-1">
								<input
									type="text"
									id="lastName"
									required
									placeholder="Doe"
									autoComplete="off"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600" />
							</div>
						</div>

						<div>
							<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mt-5">
								Phone <span className="text-red-600">*</span>
							</label>
							<div className="mt-1">
								<input
									type="tel"
									id="phone"
									required
									placeholder="Phone Number"
									autoComplete="off"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-5">
								Email Address <span className="text-red-600">*</span>
							</label>
							<div className="mt-1">
								<input
									type="email"
									id="email"
									autoComplete="off"
									placeholder="johndoe@email.com"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="invalid:text-red-600 w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-5">
								Password  <span className="text-red-600">*</span>
							</label>
							<div className="mt-1">
								<input
									type="password"
									id="password"
									autoComplete="off"
									required
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"/>
							</div>
						</div>

						<div className="flex justify-center">
							<p className="text-lg pt-5 text-slate-500">By clicking Sign Up, you agree to to IHS’ <a href="https://ihsmdinc.com/terms" className="text-ihs-green">Terms of Use</a> and <a href="https://ihsmdinc.com/privacy-policy" className="text-ihs-green">Privacy Policy.</a></p>
						</div>
						<div>
							<button
								disabled={!firstName || !lastName || !phone || !email || !password || loading ? true : false}
								className="disabled:bg-slate-400 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none px-4 py-2 w-full mt-8 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500"
							>
								Sign Up
							</button>
						</div>
					</form>

				</section>
			)}


		</>


);
};

export default SignUpForm;