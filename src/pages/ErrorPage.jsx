import React from 'react';
import Error404 from './../assets/images/error404.png';
import {useNavigate} from "react-router-dom";

const ErrorPage
= () => {
	const navigate = useNavigate();
	return (
		<>
			<div className="pt-24 flex justify-around items-center w-full h-full object-cover">
				<img src={Error404} alt="error404" />
			</div>
		</>

	);
};

export default ErrorPage;