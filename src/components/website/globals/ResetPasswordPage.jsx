import React from 'react';
import ResetPasswordForm from "../../app/ResetPasswordForm";

const ResetPasswordPage = () => {
	return (
		<div className="py-40">
			<div className="flex flex-col justify-center items-center py-4">
				<h1 className="md:text-4xl text-2xl text-ihs-green py-2">Reset your password</h1>
			</div>
			<div className="flex justify-around">
				<div className="bg-white lg:w-1/3 md:w-2/3 w-full md:px-16 md:py-16 px-10 md:rounded-3xl md:shadow-lg">
					<ResetPasswordForm />
				</div>
			</div>
		</div>
	);
};

export default ResetPasswordPage;