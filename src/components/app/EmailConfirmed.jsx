import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {BaseURL} from '../../api/axios';
import TopBarProgress from "react-topbar-progress-indicator";
import Logo from "../../assets/images/logo.svg";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const EmailConfirmed = () => {
	const {confirmationCode} = useParams();

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errMsg, setErrMsg] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	// eslint-disable-next-line no-unused-expressions
	useEffect( () => {
		setLoading(true);
		try {
			fetch(`${BaseURL}/confirm/${confirmationCode}`)
				.then(res => res.json())
				.then(data => {
					setLoading(false);
					if(data.success) {
						setSuccessMessage(data.data);
						setSuccess(true);
					} else {
						setErrMsg(data.data);
					}
				});
		} catch (e) {
			setLoading(false);
			setErrMsg(e.message);
		} finally {
			setLoading(false);
		}
	}, [confirmationCode]);

	return (
		<>
			{loading && <TopBarProgress />}
			<div className="flex flex-col justify-center items-center py-4 pt-20 pb-20 relative">
				<a href="https://ihsmdinc.com"><img src={Logo} className="w-44 lg:w-56" alt="ihs-logo"/></a>
				{success ? <h1 className="md:text-4xl text-2xl text-ihs-green pt-20">{successMessage}</h1>  : <h1 className="md:text-4xl text-2xl text-ihs-green pt-20">{errMsg}</h1>}
				{!loading && <p className="text-lg py-2">Proceed to <span className="text-ihs-green hover:underline"><Link to="/">Sign In</Link></span></p>}
			</div>
		</>
	);
};

export default EmailConfirmed;