import React from 'react';
import Error from "../components/website/globals/Error";
import Navbar from "../components/website/globals/Navbar";
import Footer from "../components/website/globals/Footer";
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
					<Navbar />
					<Error />
					<Footer />
				</>
			</>
		</HelmetProvider>

	);
};

export default ErrorPage;