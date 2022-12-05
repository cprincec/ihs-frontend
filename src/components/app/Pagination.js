import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
const Pagination = props => {
	const {
		onPageChange,
		totalCount,
		siblingCount = 1,
		currentPage,
		pageSize,

	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
	return (
		<>

			<div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">

				<div className="lg:w-3/5 w-full flex items-center justify-between border-t border-gray-200">

					<button disabled={currentPage === 1} onClick={onPrevious} className="bg-transparent border-0">
						<div className="flex items-center pt-3 text-gray-600 hover:text-ihs-green cursor-pointer">
							<svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
							<p className="text-sm ml-3 font-medium leading-none ">Previous</p>
						</div>
					</button>

					{paginationRange.map((pageNumber, index) => {

						// If the pageItem is a DOT, render the DOTS unicode character
						if (pageNumber === DOTS) {
							return <li className='list-none'>&#8230;</li>;
						}

						return (
							<div className="sm:flex hidden" key={index}>
								<p
									className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-ihs-green-shade-700 border-t border-transparent hover:border-ihs-green-shade-400 pt-3 mr-4 px-2 focus:text-ihs-green"
									onClick={() => onPageChange(pageNumber)}>{pageNumber}</p>
							</div>
						)
					})}
					<button disabled={currentPage === lastPage} onClick={onNext} className="bg-transparent border-0">

						<div className="flex items-center pt-3 text-gray-600 hover:text-ihs-green cursor-pointer">

							<p className="text-sm font-medium leading-none mr-3">Next</p>
							<svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
								<path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</div>
					</button>
				</div>
			</div>
		</>

	);
};

export default Pagination;