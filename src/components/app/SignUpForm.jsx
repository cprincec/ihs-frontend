import React, {useRef, useState} from 'react';
import axios from '../../api/axios';
import TopBarProgress from "react-topbar-progress-indicator";
import {useFormik} from "formik";
import {signupSchema} from "../../utils/formSchema";
import {ExclamationCircleIcon} from "@heroicons/react/solid";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline";
import ReCAPTCHA from "react-google-recaptcha";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const REGISTER_URL = '/user/signup';
const SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY

const SignUpForm = () => {
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [revealPwd, setRevealPwd] = useState(false);
	const [captcha, setCaptcha] = useState(false);

	const captchaRef = useRef(null)

	const handleCaptchaSuccess = async () => {
		const token = captchaRef.current.getValue();
		await axios.post('/verifyCaptchaToken', {token})
		.then(
			() => setCaptcha(true)
		)
		.catch((error) => {
			console.error(error);
		})
	}

	const handleCaptchaError = () => {
		setErrMsg("Something went wrong")
	}

	const handleCaptchaExpiration = () => {
		captchaRef.current.reset();
	}

	const onSubmit = async (values, actions) => {
		const firstName = values.firstName;
		const lastName = values.lastName;
		const phone = values.phone;
		const email = values.email;
		const password = values.password;

		try {
			await axios.post(REGISTER_URL,
				JSON.stringify({ firstName, lastName, phone, email, password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			);

			setSuccess(true);
			actions.resetForm();

		} catch (err) {
			if (!err.response) {
				setErrMsg('No Server Response');
			} else if (err.response.status === 409) {
				setErrMsg(err.response.data.message);
			} else {
				setErrMsg('Error Registering User');
			}
		}
	}

	const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			password: ''
		},
		validationSchema: signupSchema,
		onSubmit,
	})

	return (
		<>
			{success ?
				(
					<section className="rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm">
						<h1>You’ve been successfully registered.</h1>
					<br />
						<p>Please check your email inbox (including junk/spam folder) to verify account.</p>
					</section>
				)
				:
				(
					<section>
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

							<label htmlFor="firstName" className="block text-sm font-medium text-gray-500 my-2">
								First Name <span className="text-red-600">*</span>
							</label>
							<input
								value={values.firstName}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text" id="firstName"
								placeholder='John'
								className={` ${errors.firstName && touched.firstName ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								{errors.firstName && touched.firstName && <p className="text-red-500 normal-case text-xs mt-2">{errors.firstName}</p>}

							<label htmlFor="lastName" className="block text-sm font-medium text-gray-500 my-2">
								Last Name <span className="text-red-600">*</span>
							</label>
							<input
								value={values.lastName}
								onChange={handleChange}
								onBlur={handleBlur}
								type="text" id="lastName"
								placeholder='Doe'
								className={` ${errors.lastName && touched.lastName? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								{errors.lastName && touched.lastName && <p className="text-red-500 normal-case text-xs mt-2">{errors.lastName}</p>}

							<label htmlFor="phone" className="block text-sm font-medium text-gray-500 my-2">
								Phone <span className="text-red-600">*</span>
							</label>
							<input
								value={values.phone}
								onChange={handleChange}
								onBlur={handleBlur}
								type="tel" id="phone"
								placeholder='Phone Number'
								className={` ${errors.phone && touched.phone? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								{errors.phone && touched.phone && <p className="text-red-500 normal-case text-xs mt-2">{errors.phone}</p>}

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

							<label htmlFor="password" className="block text-sm font-medium text-gray-500 my-2">
								Password <span className="text-red-600">*</span>
							</label>
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

							<div className="mt-4">
								<ReCAPTCHA
									sitekey={SITE_KEY}
									ref={captchaRef}
									onChange={handleCaptchaSuccess}
									onErrored={handleCaptchaError}
									onExpired={handleCaptchaExpiration}
								/>
							</div>

							<p className="md:text-lg text-xs text-slate-500 mt-3">
								By clicking Sign Up, you agree to to IHS’
								<a href="https://ihsmdinc.com/terms" className="text-ihs-green"> Terms of Use </a>
								and
								<a href="https://ihsmdinc.com/privacy-policy" className="text-ihs-green"> Privacy Policy.</a>
							</p>
							<button
								type="submit"
								disabled={ Object.keys(errors).length > 0 || isSubmitting || captcha === false }
								className="disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none px-4 py-2 w-full mt-5 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500"
							>
								{isSubmitting ? "Submitting" : "Sign Up"}
							</button>
						</form>
					</section>
				)}

		</>


);
};

export default SignUpForm;