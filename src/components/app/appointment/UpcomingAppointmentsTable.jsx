import React, {useMemo, useState} from 'react';
import {appointmentStatus, avatar, booleanString, pageSize} from "../../../data/enums";
import Avatar from "react-avatar";
import {Link, useNavigate} from "react-router-dom";
import Pagination from "../Pagination";
import Nodata from "../../../assets/images/noData.svg";
import {getDate} from "../../../hooks/useFormatDate";

const mobilePageSize = pageSize.Mobile;
const laptopPageSize = pageSize.Laptop;

const UpcomingAppointmentsTable = ({appointmentList, urlPath}) => {
	const navigate = useNavigate();

	let appointmentsProp;

	if (appointmentList === "Appointment not found"){
		appointmentsProp = [];
	} else{
		appointmentsProp = appointmentList;
	}

	const upcomingAppointments = appointmentsProp.filter((appointment) =>
		appointment.status !== appointmentStatus.Completed);

	const [currentPage, setCurrentPage] = useState(1);

	const laptopTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * laptopPageSize;
		const lastPageIndex = firstPageIndex + laptopPageSize;
		return upcomingAppointments.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, upcomingAppointments]);

	const mobileTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * mobilePageSize;
		const lastPageIndex = firstPageIndex + mobilePageSize;
		return upcomingAppointments.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, upcomingAppointments]);

	return (
		<>
			<div className="hidden sm:block flex flex-col mt-8">
				<div className="py-2 my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div
						className="inline-block min-w-full overflow-hidden align-middle rounded-md">
						<table className="table-auto min-w-full">
							<thead>
							<tr>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
								</th>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									<p>Beneficiary</p>
								</th>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									Purpose
								</th>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									Status
								</th>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									Actions
								</th>
							</tr>
							</thead>

							<tbody className="bg-white">
							{laptopTableData?.length
								?
								laptopTableData.map(el => (
									<tr className="py-4 whitespace-no-wrap border-b border-gray-200" key={el.id}>
										<td>
											<div className="mx-4">
												<Avatar name={`${el?.beneficiaryName}`} color={avatar.BackgroundColor} fgColor={avatar.ForegroundColor}  size={avatar.width} round={true}/>
											</div>
										</td>
										<td className="px-6 py-4 ">
											<div className="flex items-center">

												<div>
													<div className="md:text-lg text-base font-medium leading-5 text-gray-500">
														{el?.beneficiaryName}
													</div>
												</div>
											</div>
										</td>

										<td className="px-6 py-4 ">
											<div className="md:text-lg text-base leading-5 text-gray-500">{el?.serviceName}</div>
										</td>

										<td className="px-6 py-4 ">
										<span
											className={el?.completed.toString() === booleanString.True
												? "inline-flex p-2 py-2 text-xs font-semibold leading-5 text-green-900 bg-green-100 rounded-md capitalize"
												: el?.status === appointmentStatus.Confirmed
													? "inline-flex p-2 py-2 text-xs font-semibold leading-5 text-blue-900 bg-blue-100 rounded-md capitalize"
													:"inline-flex p-2 text-xs font-semibold leading-5 text-red-900 bg-red-100 rounded-md capitalize"}>
											{el?.completed.toString() === booleanString.True ? appointmentStatus.Completed : el?.status}
											</span>
										</td>

										<td
											className="px-6 py-4 md:text-lg text-base leading-5 text-ihs-green ">
											<Link to={`/${urlPath}/viewappointment/${el?.id}`}>
												View
											</Link>
										</td>

									</tr>
								))

								:

								<tr>
									<td colSpan="5" className="px-6 py-4 text-center">
										<div className="flex flex-col justify-center items-center py-20">
											<img src={Nodata} alt="No Data" className="w-40 my-10"/>
											<p className="text-lg md:mx-32 mx-5 text-center">No Upcoming Appointments.</p>
										</div>
									</td>
								</tr>
							}

							</tbody>
						</table>
						<Pagination
							currentPage={currentPage}
							totalCount={upcomingAppointments.length}
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
									<tr className="py-4 whitespace-no-wrap border-b even:bg-gray-100" key={el.id} onClick={() => navigate(`/${urlPath}/viewappointment/${el?.id}`)}>
										<td className="p-4 ">
											<div className="flex justify-between items-center text-md text-gray-800">
												<span>{el?.beneficiaryName}</span>
												<span
													className={el?.completed.toString() === booleanString.True
														? "inline-flex px-2 py-1 text-xs font-normal text-green-900 bg-green-100 rounded-lg capitalize"
														: el?.status === appointmentStatus.Confirmed
															? "inline-flex px-2 py-1 text-xs font-normal text-blue-900 bg-blue-100 rounded-lg capitalize"
															:"inline-flex px-2 py-1 text-xs font-normal text-red-900 bg-red-100 rounded-lg capitalize"}>
													{el?.completed.toString() === booleanString.True ? appointmentStatus.Completed : el?.status}
												</span>
											</div>
											<div className="text-sm text-gray-500">
												<p className="mt-1">{el?.serviceName}</p>
												<p className="mt-1">{getDate(el?.date)}</p>
												<p className="mt-1">{el?.time}</p>
											</div>
										</td>
									</tr>
								))

								:

								<tr>
									<td colSpan="3" className="px-6 py-4 text-center">
										<div className="flex flex-col justify-center items-center py-20">
											<img src={Nodata} alt="No Data" className="w-40 my-10"/>
											<p className="text-lg md:mx-32 mx-5 text-center">No Upcoming Appointments.</p>
										</div>
									</td>
								</tr>
							}

							</tbody>
						</table>
						<Pagination
							currentPage={currentPage}
							totalCount={upcomingAppointments.length}
							pageSize={mobilePageSize}
							onPageChange={page => setCurrentPage(page)}
						/>

					</div>
				</div>
			</div>
		</>
	);
};

export default UpcomingAppointmentsTable;