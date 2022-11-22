import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {BaseURL} from '../../api/axios';
import TopBarProgress from "react-topbar-progress-indicator";

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
			<div className="flex flex-col justify-center items-center py-4 md:py-56 pt-44 pb-20 relative">
				{success ? <h1 className="md:text-4xl text-2xl text-ihs-green py-2">{successMessage}</h1>  : <h1 className="md:text-4xl text-2xl text-ihs-green py-2">{errMsg}</h1>}
				{!loading && <p className="text-lg py-2">Proceed to <span className="text-ihs-green hover:underline"><Link to="/signin">Sign In</Link></span></p>}
			</div>
		</>
	);
};

export default EmailConfirmed;