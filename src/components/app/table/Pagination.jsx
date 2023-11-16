const Pagination = ({ table, rowsPerPage, pageCount }) => {
    const totalPages = Math.ceil(pageCount / rowsPerPage);

    const paginationArray = [];
    for (let i = 0; i < totalPages; i++) {
        paginationArray.push(i);
    }

    return (
        <div className="lg:w-3/5 mx-auto my-6 w-full flex items-center justify-between border-t border-gray-200">
            <button
                type="button"
                onClick={() => table.setPageIndex((prevValue) => prevValue - 1)}
                disabled={!table.getCanPreviousPage()}
                className={`flex items-center pt-3 text-gray-600 bg-transparent border-0  disabled:cursor-not-allowed ${
                    table.getCanPreviousPage() ? "hover:text-ihs-green" : "hover:text-gray-600"
                }`}
            >
                <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.1665 4H12.8332"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M1.1665 4L4.49984 7.33333"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M1.1665 4.00002L4.49984 0.666687"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
            </button>
            {paginationArray.map((button, index) => {
                return (
                    <button
                        className={`hidden sm:inline bg-transparent rounded-none text-sm font-medium leading-none text-gray-600 
                        border-t border-transparent pt-3 mr-4 px-2 hover:border-t-ihs-green-shade-400 hover:text-ihs-green-shade-700 disabled:cursor-not-allowed ${
                            table.getState().pagination.pageIndex === index
                                ? "text-ihs-green-shade-700 hover:text-ihs-green-shade-700 hover:border-t-transparent"
                                : ""
                        }`}
                        key={index}
                        onClick={() => table.setPageIndex(index)}
                        disabled={table.getState().pagination.pageIndex === index}
                    >
                        {button + 1}
                    </button>
                );
            })}

            <button
                type="button"
                onClick={() => table.setPageIndex((prevValue) => prevValue + 1)}
                disabled={!table.getCanNextPage()}
                className={`flex items-center pt-3 text-gray-600 bg-transparent border-0 hover:text-ihs-green disabled:cursor-not-allowed ${
                    table.getCanNextPage() ? "hover:text-ihs-green" : "hover:text-gray-600"
                }`}
            >
                <p className="text-sm font-medium leading-none mr-3">Next</p>
                <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.1665 4H12.8332"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.5 7.33333L12.8333 4"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M9.5 0.666687L12.8333 4.00002"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
