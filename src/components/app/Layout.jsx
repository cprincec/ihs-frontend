import React, {Fragment} from 'react';
import {Link, Outlet} from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import {avatar} from "../../data/enums";
import Avatar from "react-avatar";
import Sidebar from "./Sidebar";
import {useSelector} from "react-redux";

const Layout = () => {
	const loggedInUser = useSelector((state) => state.auth.loggedInUser);

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
					<Outlet />
				</Fragment>
			</div>
		</div>
	);
};

export default Layout;