import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Nodata from "../../../assets/images/noData.svg";
import Avatar from "react-avatar"
import {avatar, pageSize, userRoles} from "../../../data/enums";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";
import Pagination from "../Pagination";

const mobilePageSize = pageSize.Mobile;
const laptopPageSize = pageSize.Laptop;

const UserTable = () => {
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();
	const {users, setUsers, loggedInUser} = useAuth();

	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const getUsers = useCallback(async () => {
				const response = await axiosPrivate.get("/users/all");

				const userList = response.data.data.filter(user => loggedInUser.id !== user.id);
				setUsers(userList.sort(
					(a, b) => {
						if (a.firstName < b.firstName) {
							return -1;
						}
						if (a.firstName > b.firstName) {
							return 1;
						}
						return 0;
					})
				);
		}, [axiosPrivate, setUsers, loggedInUser.id]);

		useEffect(() => {
				setLoading(true);
				getUsers().then(() => {
						setLoading(false);
				});
		}, [getUsers]);

	const laptopTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * laptopPageSize;
		const lastPageIndex = firstPageIndex + laptopPageSize;
		return users.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, users]);

	const mobileTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * mobilePageSize;
		const lastPageIndex = firstPageIndex + mobilePageSize;
		return users.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, users]);

	return (
		<>
			<div className="hidden sm:block flex flex-col mt-8">
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
							{laptopTableData?.length
								?
								laptopTableData.map((user, index) => (
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
														<span className="capitalize">{user?.firstName.toLowerCase()} {user?.lastName.toLowerCase()} </span>
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
											<p className="text-lg md:mx-32 mx-5 text-center">There Are No Users.</p>
										</div>
									</td>
								</tr>
							}

							</tbody>
						</table>
						<Pagination
							currentPage={currentPage}
							totalCount={users.length}
							pageSize={laptopPageSize}
							onPageChange={page => setCurrentPage(page)}
						/>

					</div>
				</div>
			</div>

			<div className="sm:hidden flex flex-col mt-8">
				<div className="py-2 my-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div
						className="inline-block min-w-full align-middle rounded-md">
						<table className="table-auto min-w-full">
							<thead>
							<tr>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									<p></p>
								</th>
							</tr>
							</thead>

							<tbody className="bg-white">
							{mobileTableData?.length
								?
								mobileTableData.map(el => (
									<tr className="py-4 whitespace-no-wrap border-b even:bg-gray-100" key={el.id} onClick={() => navigate(`viewuser/${el?.id}`)}>
										<td className="p-4 ">
											<div className="flex justify-between items-center text-md text-gray-800">
												<span className="capitalize">{el?.firstName.toLowerCase()} {el?.lastName.toLowerCase()} </span>
												<span
													className={el?.userType === userRoles.Admin
														? "inline-flex px-2 py-1 text-xs font-normal text-green-900 bg-green-100 rounded-lg capitalize"
														: el?.userType === userRoles.Employee
														? "inline-flex px-2 py-1 text-xs font-normal text-blue-900 bg-blue-100 rounded-lg capitalize"
														: "inline-flex px-2 py-1 text-xs font-normal text-amber-900 bg-amber-100 rounded-lg capitalize"}>
													{el?.userType}
												</span>
											</div>
											<div className="text-sm text-gray-500">
												<p className="mt-1">{el?.email}</p>
												<p className="mt-1">{el?.phone}</p>
											</div>
										</td>
									</tr>
								))

								:

								<tr>
									<td colSpan="3" className="px-6 py-4 text-center">
										<div className="flex flex-col justify-center items-center py-20">
											<img src={Nodata} alt="No Data" className="w-40 my-10"/>
											<p className="text-lg md:mx-32 mx-5 text-center">There Are No Users.</p>
										</div>
									</td>
								</tr>
							}

							</tbody>
						</table>
						<Pagination
							currentPage={currentPage}
							totalCount={users.length}
							pageSize={mobilePageSize}
							onPageChange={page => setCurrentPage(page)}
						/>

					</div>
				</div>
			</div>

		</>
	);
};

export default UserTable;