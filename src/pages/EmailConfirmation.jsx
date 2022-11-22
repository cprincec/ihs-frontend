import React from 'react';
import Navbar from "../components/website/globals/Navbar";
import EmailConfirmed from "../components/app/EmailConfirmed";
import Footer from "../components/website/globals/Footer";
import {Helmet, HelmetProvider} from "react-helmet-async";

const EmailConfirmation = () => {
	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Confirm Email | IHS</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<>
					<Navbar />
					<EmailConfirmed />
					<Footer />
				</>
			</>
		</HelmetProvider>
	);
};

export default EmailConfirmation;