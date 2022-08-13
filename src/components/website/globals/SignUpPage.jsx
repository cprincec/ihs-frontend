import React from 'react';
import {Link} from "react-router-dom";
import SignUpForm from "../../app/SignUpForm";

const SignUpPage = () => {
	return (
		<div className="py-40 relative">
			<div className="flex flex-col justify-center items-center py-4">
				<h1 className="md:text-4xl text-2xl text-ihs-green py-2">Create an account. It's free</h1>
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