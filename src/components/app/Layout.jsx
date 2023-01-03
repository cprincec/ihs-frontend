import React, {Fragment} from 'react';
import {Outlet} from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import {avatar} from "../../data/enums";
import Avatar from "react-avatar";
import Sidebar from "./Sidebar";
import {useSelector} from "react-redux";

const Layout = () => {
	const loggedInUser = useSelector((state) => state.auth.loggedInUser);

	return (
		<div className="flex-1">
			<Sidebar />
			<div>
				<nav className="flex justify-between h-20 border border-0 border-b border-slate-200 bg-white sm:pl-32 pl-20">
					<p></p>
					<img src={Logo} alt="logo" className="w-44" />

					<div className="flex flex-row items-center">
						<p className="text-xl text-gray-700 hidden md:block">{loggedInUser?.firstName} {loggedInUser?.lastName}</p>
						<div className="px-5">
							<Avatar name={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} color={avatar.BackgroundColor} fgColor={avatar.ForegroundColor}  size={avatar.width} round={true}/>
						</div>
					</div>
				</nav>
				<Fragment>
					<Outlet />
				</Fragment>
			</div>
		</div>
	);
};

export default Layout;