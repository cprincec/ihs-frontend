import React from 'react';
import Unauthorized from "../components/website/globals/Unauthorized";
import {Helmet, HelmetProvider} from "react-helmet-async";

const UnauthorizedPage
= () => {
	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Unauthorized Access | IHS</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<>
					<Unauthorized />
				</>
			</>
		</HelmetProvider>

	);
};

export default UnauthorizedPage;