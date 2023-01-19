import {useMemo, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Nodata from "../../../assets/images/noData.svg";
import {pageSize} from "../../../data/enums";
import Pagination from "../Pagination";

const mobilePageSize = pageSize.Mobile;
const laptopPageSize = pageSize.Laptop;

const ServiceTable = ({services}) => {
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);

	const laptopTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * laptopPageSize;
		const lastPageIndex = firstPageIndex + laptopPageSize;
		return services.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, services]);

	const mobileTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * mobilePageSize;
		const lastPageIndex = firstPageIndex + mobilePageSize;
		return services.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, services]);

	return (
		<>
			<div className="hidden sm:block flex flex-col mt-8">
				<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div
						className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-md">
						<table className="table-auto min-w-full">
							<thead>
							<tr>
								<th
									className="px-6 py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									<p>Service</p>
								</th>
								<th
									className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									Category
								</th>
								<th
									className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									Actions
								</th>
							</tr>
							</thead>

							<tbody className="bg-white">
							{laptopTableData?.length
								?
								laptopTableData.map((service, index) => (
									<tr key={index}>
										<td className="py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="flex items-center">
												<div className="ml-4">
													<div className="md:text-lg text-base font-medium leading-5 text-gray-500">
														{service?.name}
													</div>
												</div>
											</div>
										</td>

										<td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
											<div className="md:text-lg text-base leading-5 text-gray-500 capitalize">{service?.category}</div>
										</td>

										<td
											className="px-6 py-4 md:text-lg text-base leading-5 text-ihs-green whitespace-no-wrap border-b border-gray-200">
											<Link to={`viewservice/${service?.id}`}>
												View
											</Link>
										</td>

									</tr>
								))

								:
								<tr>
									<td colSpan="3" className="px-6 py-4 text-center">
										<div className="flex flex-col justify-center items-center py-20">
											<img src={Nodata} alt="No Data" className="w-40 my-10"/>
											<p className="text-lg md:mx-32 mx-5 text-center">There Are No Services.</p>
										</div>
									</td>
								</tr>
							}

							</tbody>
						</table>
						<Pagination
							currentPage={currentPage}
							totalCount={services.length}
							pageSize={mobilePageSize}
							onPageChange={page => setCurrentPage(page)}
						/>
					</div>
				</div>
			</div>

			{/*Mobile Table*/}
			<div className="sm:hidden flex flex-col my-8">
				<div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
					<div
						className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-md">
						<table className="table-auto min-w-full">
							<thead>
							<tr>
								<th
									className="py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
									<p></p>
								</th>
							</tr>
							</thead>

							<tbody className="bg-white">
							{mobileTableData?.length
								?
								mobileTableData.map((service, index) => (
									<tr className="py-4 whitespace-no-wrap border-b even:bg-gray-100" key={index} onClick={() => navigate(`viewservice/${service?.id}`)}>
										<td className="p-4 ">
											<div className="flex justify-between items-center text-md text-gray-800">
												<span>{service?.name}</span>
											</div>
											<div className="text-sm text-gray-500">
												<p className="flex justify-between mt-1">
													<span>Category</span>
													<span className="text-gray-800 capitalize">{service?.category}</span>
												</p>
											</div>
										</td>
									</tr>
								))
								:
								<tr>
									<td colSpan="5" className="px-6 py-4 text-center">
										<div className="flex flex-col justify-center items-center py-20">
											<img src={Nodata} alt="No Data" className="w-40 my-10"/>
											<p className="text-lg md:mx-32 mx-5 text-center">There Are No Services.</p>
										</div>
									</td>
								</tr>
							}
							</tbody>
						</table>
						<Pagination
							currentPage={currentPage}
							totalCount={services.length}
							pageSize={mobilePageSize}
							onPageChange={page => setCurrentPage(page)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ServiceTable;