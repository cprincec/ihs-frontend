import React from 'react';
import ResetPasswordPage from "../components/website/globals/ResetPasswordPage";
import {Helmet, HelmetProvider} from "react-helmet-async";

const ResetPassword = () => {
	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Reset Password | IHS</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<>
					<ResetPasswordPage />
				</>
			</>
		</HelmetProvider>
	);
};

export default ResetPassword;