import React, {Fragment, useEffect, useState} from 'react';
import {Link, Outlet} from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import {avatar} from "../../data/enums";
import Avatar from "react-avatar";
import Sidebar from "./Sidebar";
import {useSelector} from "react-redux";
import {Capacitor} from "@capacitor/core";
import {iosStyles} from "../../mobileStyles";

const Layout = () => {
	const loggedInUser = useSelector((state) => state.auth.loggedInUser);

	const [platform, setPlatform] = useState('')

	useEffect(() => {
		setPlatform(Capacitor.getPlatform());
	}, [])

	return (
		<div className="flex-1">
			<div>
				<nav className={`flex justify-between border border-0 border-b border-slate-200 bg-white sticky top-0 w-full pb-2 
				 ${platform === 'ios' ? iosStyles.safeAreaTopPadding : 'py-4'}`}>
					<div className='flex'>
						<Sidebar platform={platform}/>
						<img src={Logo} alt="logo" className="w-28 ml-10" />
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