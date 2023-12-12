const Pagination = ({ table, rowsPerPage, pageCount }) => {
    const totalPages = Math.ceil(pageCount / rowsPerPage);

    const paginationArray = [];
    for (let i = 0; i < totalPages; i++) {
        paginationArray.push(i);
    }

    return (
        <div className="mx-auto my-6 w-full flex justify-between">
            <button
                type="button"
                onClick={() => table.setPageIndex((prevValue) => prevValue - 1)}
                disabled={!table.getCanPreviousPage()}
                className={`transition flex items-center text-black border-0 hover:text-white bg-transparent disabled:bg-transparent disabled:cursor-not-allowed ${
                    table.getCanPreviousPage()
                        ? "hover:bg-transparent hover:text-gray-500"
                        : "hover:text-gray-500"
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
            <div className="flex">
                {paginationArray.map((button, index) => {
                    return (
                        <button
                            className={`hover:bg-transparent transition border-[1px] border-gray-200 border-x-transparent hidden sm:inline bg-transparent rounded-none text-sm font-medium leading-none text-gray-600 
                         py-2 mr-4 px-2 hover:border-t-ihs-green-shade-400 hover:border-b-ihs-green-shade-400 hover:text-ihs-green-shade-700 disabled:hover:text-ihs-green-shade-700 disabled:text-ihs-green-shade-700 disabled:cursor-not-allowed disabled:border-y-ihs-green-shade-400 disabled:bg-transparent 
                        `}
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
                    className={`transition flex items-center text-black border-0 hover:text-white bg-transparent disabled:bg-transparent disabled:cursor-not-allowed ${
                        table.getCanNextPage()
                            ? "hover:text-gray-500 hover:bg-transparent"
                            : "hover:text-gray-600"
                    }`}
                >
                    <p className="text-sm font-medium leading-none mr-3">Next</p>
                    <svg
                        width={14}
                        height={8}
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
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
        </div>
    );
};

export default Pagination;
