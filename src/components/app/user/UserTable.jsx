import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Nodata from "../../../assets/images/noData.svg";
import Avatar from "react-avatar"
import {avatar} from "../../../data/enums";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";

const UserTable = () => {
		const axiosPrivate = useAxiosPrivate();
		const {users, setUsers, loggedInUser} = useAuth();
		const [loading, setLoading] = useState(false);

		const getUsers = useCallback(async () => {
				const response = await axiosPrivate.get("/users/all");

				const userList = response.data.data.filter(user => loggedInUser.id !== user.id);
				setUsers(userList);
		}, [axiosPrivate, setUsers, loggedInUser.id]);

		useEffect(() => {
				setLoading(true);
				getUsers().then(() => {
						setLoading(false);
				});
		}, [getUsers]);

	return (
		<div className="flex flex-col mt-8">
				{loading && <TopBarProgress />}
				<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
				<div
					className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-md">
					<table className="table-auto min-w-full">
						<thead>
						<tr>
							<th
								className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
							</th>
							<th
								className="py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
								<p>Name</p>
							</th>
							<th
								className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
								Email
							</th>
							<th
								className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
								Phone
							</th>
							<th
								className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
								Role
							</th>
							<th
								className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
								More...
							</th>
						</tr>
						</thead>

						<tbody className="bg-white">
						{users?.length
							?
							users.map((user, index) => (
							<tr key={index}>
								<td className="pl-6 py-4 whitespace-no-wrap border-b border-gray-200">
									<div className="mr-4">
										<Avatar name={`${user?.firstName} ${user?.lastName}`} color={avatar.BackgroundColor} fgColor={avatar.ForegroundColor}  size={avatar.width} round={true}/>
									</div>
								</td>
								<td className="py-4 whitespace-no-wrap border-b border-gray-200">
									<div className="flex items-center">
										<div>
											<div className="md:text-lg text-base font-medium leading-5 text-gray-500">
												{user?.firstName} {user?.lastName}
											</div>
										</div>
									</div>
								</td>

								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
									<div className="md:text-lg text-base leading-5 text-gray-500">{user?.email}</div>
								</td>

								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
									<p className="md:text-lg text-base leading-5 text-gray-500">{user?.phone}</p>
								</td>

								<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
										<span
											className="inline-flex p-2 py-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-md capitalize">
											{user?.userType}
											</span>
								</td>

									<td
										className="px-6 py-4 md:text-lg text-base leading-5 text-ihs-green whitespace-no-wrap border-b border-gray-200">
										<Link to={`viewuser/${user?.id}`}>
											View Details
										</Link>
									</td>

								</tr>
							))
							:
							// error message
							<tr>
								<td colSpan="6" className="px-6 py-4 text-center">
									<div className="flex flex-col justify-center items-center py-20">
										<img src={Nodata} alt="No Data" className="w-40 my-10"/>
										<p className="text-lg md:mx-32 mx-5 text-center">There are currently no users. Check back later</p>
									</div>
								</td>
							</tr>
						}

						</tbody>
					</table>

				</div>
			</div>
		</div>
	);
};

export default UserTable;