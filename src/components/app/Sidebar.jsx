import {useState} from 'react';
import {LogoutIcon, ViewListIcon, XIcon} from "@heroicons/react/outline";
import Logo from "../../assets/images/logo.svg";
import {userRoles} from "../../data/enums";
import {adminLinks, employeeLinks, footerLinks, userLinks} from "../../data/data";
import {NavLink, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Modal from "./Modal";
import axios from "../../api/axios";

const activeLink = "flex w-70 items-center gap-5 text-lg text-ihs-green bg-ihs-green-shade-200 border border-0 border-r-2 border-r-ihs-green pl-5 py-2"
const normalLink = "flex w-70 items-center gap-5 text-lg hover:bg-ihs-green-shade-100 border border-0 hover:border-r-2 hover:border-r-ihs-green pl-5 py-2"

const Sidebar = () => {
	const {auth, setAuth} = useAuth();
	const navigate = useNavigate();
	const [toggleModal, setToggleModal] = useState(false)

	const showModal = () => {
		setToggleModal(true)
	}

	const logout = async () => {
		setAuth({});
		await axios('/logout', {
			withCredentials: true
		});

		localStorage.clear();

		navigate('/');
	}

	const displayLinks = (links) => {
		return (
			links.map((item) => {
				return(
					<NavLink to={`/${item.path}`} key={item.path} className={({isActive}) => isActive ? activeLink : normalLink} onClick={openBar}>
						{item.icon}
						<span className="capitalize">{item.title}</span>
					</NavLink>
				)
			} )
		)

	}

	const openBar = () => {
		document.querySelector('.sidebar').classList.toggle('left-[-300px]')
	}

	return (
		<>
			<div>
				<span className="absolute text-white text-4xl top-5 left-4 cursor-pointer" onClick={openBar}>

					<ViewListIcon className="w-10 h-10 px-2 bg-ihs-green text-white rounded-md shadow-xl"/>
				</span>
				<div className="sidebar fixed top-0 bottom-0 3xl:left-0 left-[-300px] duration-500
				 w-[300px] overflow-y-auto text-center bg-cyan-50 shadow h-full z-10">
						<div>
							<div className="p-2.5 mt-1 flex items-center rounded-md ">
								<img src={Logo} alt="logo" className="w-40" />
								<XIcon className="ml-20 text-slate-500 w-10 h-10 bg-transparent border" onClick={openBar}/>
							</div>
							<hr className="my-2 text-gray-600" />

							<div className="relative lg:h-[calc(100vh_-_110px)] h-[calc(100vh_-_100px)]">

								{ auth?.userType === userRoles.User
										? displayLinks(userLinks)
										: auth?.userType === userRoles.Employee
											? displayLinks(employeeLinks)
											: displayLinks(adminLinks)
									}


								<div className="absolute py-4 bottom-0 w-full">

									{displayLinks(footerLinks)}

									<div className={`cursor-pointer ${normalLink}`}  onClick={showModal}>
										<LogoutIcon  className="w-6" />
										<span className="capitalize">Logout</span>
									</div>

									<p className="flex justify-start pl-5 py-2 text-sm">© 2023 Copyright. v1.1.0</p>
								</div>

							</div>
						</div>
					</div>
				{toggleModal && <Modal setToggleModal={setToggleModal} executeFunction={logout} message="Are you sure you want to logout?" header='Are You Sure?' /> }
			</div>
		</>
	);
};

export default Sidebar;