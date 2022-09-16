import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, UserIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ViewUserBeneficiaries from "./ViewUserBeneficiaries";

const ViewUser = () => {
	const user = useParams();
	const navigate = useNavigate();
	const {users} = useAuth();
	const [userDetails, setUserDetails] = useState({})

	useEffect(() => {
		const userId = user.userId;
		const filteredUser = users.filter(user => user.id === userId);
		filteredUser.length === 0 ? navigate(-1) : setUserDetails(filteredUser[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="lg:p-20 md:p-10 p-3">
			<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mb-20 md:mt-0 my-10" onClick={() => navigate("/users")}>
				<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Users</p>
			</button>
			<div className="flex">
				<div className="flex-1">
					<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
						<div className="flex">
							<UserIcon className="md:w-14 w-8 md:ml-10 ml-3" />
							<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">User Details</h3>
						</div>

					</div>

					<div className="my-10 ml-5 text-gray-600 text-xl" >
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Full Name: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{userDetails?.firstName} {userDetails?.lastName} </p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Email: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{userDetails?.email} </p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Phone: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2">{userDetails?.phone}</p>
						</div>
						<div className="grid grid-cols-4">
							<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Role: </p>
							<p className="py-5 md:ml-5 md:col-start-2 col-span-2 capitalize">{userDetails?.userType}</p>
						</div>

					</div>
				</div>
			</div>
			<div className="flex justify-between items-center mt-10">
				<h2 className="md:text-2xl text-xl">Beneficiaries</h2>
			</div>

			<hr className="my-10"/>
			<ViewUserBeneficiaries />
		</div>
	);
};

export default ViewUser;