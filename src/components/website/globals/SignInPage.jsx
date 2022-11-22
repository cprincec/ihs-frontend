import React from 'react';
import {Link} from "react-router-dom";
import SignInForm from "../../app/SignInForm";
import Logo from "../../../assets/images/logo.svg";

const SignInPage = () => {
	return (
		<div className="py-20">
			<div className="flex flex-col justify-center items-center py-4">
				<img src={Logo} className="w-44 lg:w-56" alt="ihs-logo"/>
				<h1 className="md:text-4xl text-2xl text-ihs-green pt-20">Sign in to your account</h1>
				<p className="text-sm py-2">Don't have an account? <span className="text-ihs-green hover:underline"><Link to="/signup">Sign Up</Link></span></p>
			</div>
			<div className="flex justify-around">
				<div className="bg-white lg:w-1/3 md:w-2/3 w-full md:px-16 md:py-16 px-10 md:rounded-3xl md:shadow-lg">
					<SignInForm />
				</div>
			</div>
		</div>	);
};

export default SignInPage;