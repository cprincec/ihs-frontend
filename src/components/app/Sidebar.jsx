import { useEffect, useRef, useState } from "react";
import { LogoutIcon, ViewListIcon, XIcon } from "@heroicons/react/outline";
import Logo from "../../assets/images/logo.svg";
import { userRoles } from "../../data/enums";
import { adminLinks, employeeLinks, footerLinks, userLinks } from "../../data/data";
import { NavLink, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import axios from "../../api/axios";
import OutsideClick from "../../hooks/outsideClick";
import { revertAll } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { iosStyles } from "../../mobileStyles";
import { getKey, removeKey } from "../../utils/mobilePreferences";
import ActionModal from "../shared/ActionModal";

const activeLink =
    "flex w-70 items-center gap-5 text-lg text-ihs-green bg-ihs-green-shade-200 border border-0 border-r-2 border-r-ihs-green pl-5 py-2";
const normalLink =
    "flex w-70 items-center gap-5 text-lg hover:bg-ihs-green-shade-100 border border-0 hover:border-r-2 hover:border-r-ihs-green pl-5 py-2";

const Sidebar = ({ platform }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userType = useSelector((state) => state.auth.userAccess.userType);

    const sidebarRef = useRef(null);
    const outsideSidebarClick = OutsideClick(sidebarRef);

    const [toggleModal, setToggleModal] = useState(false);
    const [mobileAuth, setMobileAuth] = useState("");

    const showModal = () => {
        setToggleModal(true);
    };

    // get auth mobile preferences
    useEffect(() => {
        getKey("auth")
            .then((result) => {
                setMobileAuth(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const logoutApiCall = async () => {
        try {
            await axios("/logout", { withCredentials: true });
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await logoutApiCall();

            await dispatch(revertAll());
            localStorage.clear();
            await removeKey("auth");
            await removeKey("loggedInUser");

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const displayLinks = (links) => {
        return links.map((item) => {
            return (
                <NavLink
                    to={`/${item.path}`}
                    key={item.path}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    onClick={openBar}
                >
                    {item.icon}
                    <span className="capitalize">{item.title}</span>
                </NavLink>
            );
        });
    };

    const openBar = () => {
        document.querySelector(".sidebar").classList.toggle("left-[-300px]");
    };

    return (
        <>
            <div ref={sidebarRef}>
                <span className="text-white text-4xl cursor-pointer" onClick={openBar}>
                    <ViewListIcon
                        className={` ${
                            platform === "ios"
                                ? iosStyles.navigationIcon
                                : "ml-3 w-10 h-10 px-2 bg-ihs-green text-white rounded-md shadow-xl"
                        } `}
                    />
                </span>
                <div
                    className={`sidebar fixed top-0 bottom-0 3xl:left-0 left-[-300px] duration-500
				 w-[300px] overflow-y-auto text-center bg-cyan-50 shadow h-full z-10 ${
                     outsideSidebarClick ? "left-[-300px]" : ""
                 }`}
                >
                    <div>
                        <div
                            className={`p-2.5 mt-1 flex items-center rounded-md ${
                                platform === "ios" ? iosStyles.safeAreaTopPadding : ""
                            }`}
                        >
                            <img src={Logo} alt="logo" className="w-40" />
                            <XIcon
                                className="ml-20 text-slate-500 w-10 h-10 bg-transparent border"
                                onClick={openBar}
                            />
                        </div>
                        <hr className="my-2 text-gray-600" />

                        <div className="relative lg:h-[calc(100vh_-_110px)] h-[calc(100vh_-_100px)]">
                            {(mobileAuth?.userType || userType) === userRoles.User
                                ? displayLinks(userLinks)
                                : (mobileAuth?.userType || userType) === userRoles.Employee
                                ? displayLinks(employeeLinks)
                                : displayLinks(adminLinks)}

                            <div className="absolute py-4 bottom-0 w-full">
                                {displayLinks(footerLinks)}

                                <div className={`cursor-pointer mb-10 ${normalLink}`} onClick={showModal}>
                                    <LogoutIcon className="w-6" />
                                    <span className="capitalize">Logout</span>
                                </div>

                                <p className="flex justify-start pl-5 py-2 text-sm">
                                    © 2023 Copyright. v1.1.0
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {toggleModal && (
                    <ActionModal
                        display={toggleModal}
                        setDisplay={setToggleModal}
                        actionHeader={"Logging out?"}
                        actionMessage={"Are you sure you want to logout of IHS?"}
                        actionFunction={logout}
                    />
                )}
            </div>
        </>
    );
};

export default Sidebar;
