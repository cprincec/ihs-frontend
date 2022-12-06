import React from 'react';
import EmailConfirmed from "../components/app/EmailConfirmed";
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
					<EmailConfirmed />
				</>
			</>
		</HelmetProvider>
	);
};

export default EmailConfirmation;