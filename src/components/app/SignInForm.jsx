import React, {useEffect, useState} from 'react';
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import {useNavigate, useLocation, Link} from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline";
import {useFormik} from "formik";
import {signinSchema} from "../../utils/formSchema";
import {ExclamationCircleIcon} from "@heroicons/react/solid";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const LOGIN_URL = "/user/login";

const SignInForm = () => {
	const {auth, setAuth, persist, setPersist} = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/";

	const [errMsg, setErrMsg] = useState('');
	const [revealPwd, setRevealPwd] = useState(false);


	const onSubmit = async (values, actions) => {
		const email = values.email;
		const password = values.password;

		try {
			const response = await axios.post(LOGIN_URL,
				JSON.stringify({ email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);

			const accessToken = response?.data?.data?.accessToken
			const userType = response?.data?.data?.userType
			setAuth({accessToken, userType});

			localStorage.setItem('userType', userType);
			localStorage.setItem('loggedInFlag', JSON.stringify(true));

			actions.resetForm();

			if (from === "/") {
				navigate('/dashboard');
			} else {
				navigate(from, {replace: true});
			}

		} catch (err) {
			if (!err.response) {
				setErrMsg('No Server Response');
			} else if (err.response.status === 409 || err.response.status === 500) {
				setErrMsg(err.response.data.message);
			} else {
				setErrMsg('Something went wrong');
			}
		}
	}

	const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: signinSchema,
		onSubmit,
	})

	const togglePersist = () => {
		setPersist(prev => !prev)
	}

	useEffect(() => {
		if (auth?.accessToken){
			navigate("/dashboard");
		}
	})

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist])

	return (
		<>
			{isSubmitting && <TopBarProgress />}
			<p
				className={errMsg ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm" : "absolute -left-[99999px]"}
				aria-live="assertive">
				<span className="flex items-center">
					<ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline"/>
					{errMsg}
				</span>
			</p>
			<form onSubmit={handleSubmit} autoComplete="off">

				<label htmlFor="email" className="block text-sm font-medium text-gray-500 my-2">
					Email <span className="text-red-600">*</span>
				</label>
				<input
					value={values.email}
					onChange={handleChange}
					onBlur={handleBlur}
					type="email" id="email"
					autoComplete="false"
					placeholder='johndoe@email.com'
					className={` ${errors.email && touched.email? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
				{errors.email && touched.email && <p className="text-red-500 normal-case text-xs mt-2">{errors.email}</p>}

				<div className="flex justify-between">
					<label htmlFor="password" className="block text-sm font-medium text-gray-500 my-2">
						Password <span className="text-red-600">*</span>
					</label>
					<label htmlFor="password" className="block text-sm font-medium my-2 text-ihs-green hover:underline">
						<Link to="/reset-password">Forgot Password?</Link>
					</label>
				</div>
				<span className="flex items-center">
					<input
						value={values.password}
						onChange={handleChange}
						onBlur={handleBlur}
						type= {revealPwd ? "text" : "password"}
						id="password"
						placeholder='Password'
						className={` ${errors.password && touched.password? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`} />

					{revealPwd ?
						<EyeOffIcon className="w-4 -ml-6 text-gray-500" onClick={() => setRevealPwd(prevState => !prevState) }/>
						:
						<EyeIcon className="w-4 -ml-6 text-gray-500" onClick={() => setRevealPwd(prevState => !prevState) } />
					}
				</span>

				{errors.password && touched.password && <p className="text-red-500 normal-case text-xs mt-2">{errors.password}</p>}

				<span className="flex justify-start items-center pt-2">
					<input
						className="mr-1 accent-ihs-green-shade-500"
						type="checkbox"
						id="persist"
						onChange={togglePersist}
						checked={persist}
					/>
					<label className="text-sm font-light text-gray-600" htmlFor="persist">Remember Password?</label>
				</span>

				<button
					type="submit"
					disabled={ Object.keys(errors).length > 0 || isSubmitting }
					className="disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none px-4 py-2 w-full mt-5 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500"
				>
					{isSubmitting ? "Submitting" : "Sign In"}
				</button>
			</form>

		</>
	);
};

export default SignInForm;