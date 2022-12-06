import React from 'react';
import {Link} from "react-router-dom";
import SignUpForm from "../../app/SignUpForm";
import Logo from "../../../assets/images/logo.svg";

const SignUpPage = () => {
	return (
		<div className="py-20 relative">
			<div className="flex flex-col justify-center items-center py-4">
				<a href="https://ihsmdinc.com"><img src={Logo} className="w-44 lg:w-56" alt="ihs-logo"/></a>
				<h1 className="md:text-4xl text-2xl text-ihs-green pt-20">Create an account. It's free</h1>
				<p className="text-lg py-2">Already have an account? <span className="text-ihs-green hover:underline"><Link to="/signin">Sign In</Link></span></p>
			</div>
			<div className="flex justify-around">
				<div className="bg-white lg:w-1/2 md:w-2/3 w-full md:px-16 md:py-8 px-10 md:rounded-3xl md:shadow-lg">
					<SignUpForm />
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;