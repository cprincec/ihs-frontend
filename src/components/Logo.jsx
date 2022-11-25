import React from 'react';
import logo from "../assets/images/logo.svg";

const Logo = () => {
	return (
		<a href="https://ihsmdinc.com">
			<img src={logo} className="w-44 lg:w-56" alt="ihs-logo"/>
		</a>
	);
};

export default Logo;