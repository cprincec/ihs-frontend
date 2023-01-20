import React, {Fragment} from 'react';
import {Link, Outlet} from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import useAuth from "../../hooks/useAuth";
import {avatar} from "../../data/enums";
import Avatar from "react-avatar";
import Sidebar from "./Sidebar";

const Layout = () => {
	const {loggedInUser} = useAuth();

	const closeBar = () => {
		document.querySelector('.sidebar').classList.remove('left-[0px]')
		document.querySelector('.sidebar').classList.add('left-[-300px]')
	}

	return (
		<div className="flex-1">
			<div>
				<nav className="flex justify-between h-20 border border-0 border-b border-slate-200 bg-white fixed w-full">
					<div className='flex'>
						<Sidebar />
						<img src={Logo} alt="logo" className="w-28 ml-20" />
					</div>


					<div className="flex flex-row items-center">
						<p className="text-xl text-gray-700 hidden md:block"><Link to="/profile">{loggedInUser?.firstName} {loggedInUser?.lastName}</Link></p>
						<div className="px-5">
							<Link to="/profile">
								<Avatar name={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`} color={avatar.BackgroundColor} fgColor={avatar.ForegroundColor}  size={avatar.width} round={true}/>
							</Link>
						</div>
					</div>
				</nav>
				<Fragment>
					<div onClick={closeBar}>
						<Outlet />
					</div>
				</Fragment>
			</div>
		</div>
	);
};

export default Layout;