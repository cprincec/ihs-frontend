import React from 'react';
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
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
					<Navbar />
					<ResetPasswordPage />
					<Footer />
				</>
			</>
		</HelmetProvider>
	);
};

export default ResetPassword;