import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

import {useDispatch, useSelector} from "react-redux";
import {signInUser, storeAuthInfo, togglePersist} from "./authSlice";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const SignInForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { persist, accessToken } = useSelector((state) => state.auth.userAccess)

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState('')


	useEffect(() => {
		if (accessToken){
			navigate("/newDashboard");
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);

		dispatch(signInUser({ email, password })).unwrap()
		.then(
			async (result) => {

				if (typeof result === "string"){
					setErrMsg(await result)
				} else {
					dispatch(storeAuthInfo(result.data))
					navigate("/dashboard")
				}
			});

		setEmail('')
		setPassword('')
		setLoading(false);
		setErrMsg('')
	}

	return (
		<>
			{loading && <TopBarProgress />}
			{errMsg ? (
					<p className="rounded-md p-4 mb-4 bg-ihs-green-shade-200 text-red-500 font-normal text-lg">{errMsg}</p>
				) :
				<p className= "absolute -left-[99999px]" aria-live="assertive"></p>
			}

			<form className="mb-0 space-y-0" onSubmit={ handleSubmit }>
				<div className="">
					<label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-5">Email Address <span className="text-red-600">*</span></label>
					<div className="mt-1">
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
							required
							placeholder="johndoe@email.com"
							className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"/>
					</div>

				</div>

				<div className="">
					<div className="flex justify-between">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-5">Password  <span className="text-red-600">*</span></label>
						<label className="block text-sm font-medium mt-5 text-ihs-green hover:underline"><Link to="/reset-password">Forgot Password?</Link></label>
					</div>

					<div className="mt-1">
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
							required
							placeholder="Password"
							className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"/>
					</div>
				</div>

				<div className="flex justify-start items-center pt-2">
					<input
						className="mr-1"
						type="checkbox"
						id="persist"
						onChange={() => dispatch(togglePersist(persist))}
						checked={persist}
					/>
					<label className="text-sm font-light text-gray-600" htmlFor="persist">Remember Password?</label>
				</div>

				<div>
					<button
						className="px-4 py-2 w-full mt-8 bg-ihs-green hover:font-bold
					focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500
					disabled:bg-slate-400 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none">
						Sign In
					</button>
				</div>


			</form>
		</>
	)
}

export default SignInForm