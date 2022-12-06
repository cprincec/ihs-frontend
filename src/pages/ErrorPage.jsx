import React from 'react';
import Error from "../components/website/globals/Error";
import {Helmet, HelmetProvider} from "react-helmet-async";

const ErrorPage
= () => {
	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Error Page | IHS</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<>
					<Error />
				</>
			</>
		</HelmetProvider>

	);
};

export default ErrorPage;