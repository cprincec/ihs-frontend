import React, {Fragment} from 'react';
import {Outlet} from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import useAuth from "../../hooks/useAuth";
import {avatar} from "../../data/enums";
import Avatar from "react-avatar";
import Sidebar from "./Sidebar";

const Layout = () => {
	const {loggedInUser} = useAuth();

	return (
		<div className="flex-1">
			<div>
				<nav className="flex justify-between h-20 border border-0 border-b border-slate-200 bg-white fixed w-full">
					<div className='flex'>
						<Sidebar />
						<img src={Logo} alt="logo" className="w-28 ml-20" />
					</div>


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