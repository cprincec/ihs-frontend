import React, { Fragment, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { avatar } from "../../data/enums";
import Avatar from "react-avatar";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { Capacitor } from "@capacitor/core";
import { iosStyles } from "../../mobileStyles";
import { getKey } from "../../utils/mobilePreferences";
import { capitalizeString } from "../../utils/capitalizeString";
import Spinner from "./SVGs/Spinner";

const Layout = () => {
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);

    const [platform, setPlatform] = useState("");
    const [mobileLoggedInUser, setMobileLoggedInUser] = useState("");

    useEffect(() => {
        setPlatform(Capacitor.getPlatform());
    }, []);

    useEffect(() => {
        getKey("loggedInUser")
            .then((result) => {
                setMobileLoggedInUser(result);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div className="flex-1">
            <div>
                <nav
                    className={`z-10 flex justify-between border-0 border-b border-slate-200 bg-white sticky top-0 w-full pb-2 
				 ${
                     platform === "ios"
                         ? iosStyles.safeAreaTopPadding
                         : platform === "android"
                         ? iosStyles.androidNavbar
                         : "py-4"
                 }`}
                >
                    <div className="flex">
                        <Sidebar platform={platform} />
                        <img src={Logo} alt="logo" className="w-28 ml-10" />
                    </div>

                    {(loggedInUser?.firstName || mobileLoggedInUser?.firstName) &&
                    (loggedInUser?.lastName || mobileLoggedInUser?.lastName) ? (
                        <div className="flex flex-row items-center">
                            <p className="text-xl text-gray-700 hidden md:block">
                                <Link to="/profile">
                                    {capitalizeString(loggedInUser?.firstName) ||
                                        capitalizeString(mobileLoggedInUser?.firstName)}{" "}
                                    {capitalizeString(loggedInUser?.lastName) ||
                                        capitalizeString(mobileLoggedInUser?.lastName)}
                                </Link>
                            </p>
                            <div className="px-5">
                                <Link to="/profile">
                                    <Avatar
                                        name={`${
                                            capitalizeString(loggedInUser?.firstName) ||
                                            capitalizeString(mobileLoggedInUser?.firstName)
                                        } ${
                                            capitalizeString(loggedInUser?.lastName) ||
                                            capitalizeString(mobileLoggedInUser?.lastName)
                                        }`}
                                        color={avatar.BackgroundColor}
                                        fgColor={avatar.ForegroundColor}
                                        size={avatar.width}
                                        round={true}
                                    />
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <Spinner className="mr-8" style={{ width: "2rem" }} />
                    )}
                </nav>
                <Fragment>
                    <Outlet />
                </Fragment>
            </div>
        </div>
    );
};

export default Layout;
