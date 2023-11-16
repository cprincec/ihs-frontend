import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import Pagination from "./Pagination";
import noData from "../../../assets/images/noData.svg";
import MobileTable from "./MobileTable";
import DesktopTable from "./DesktopTable";

/**
 *
 * This Table expects an actions column which will be used to perform actions regarding specific
 * rows in the table. Example to view a specific appointment
 *
 * The actions columns must have an accessor key of "actions"
 *
 * */
const BaseTable = ({ data, columns, rowsPerPage, options, actionBaseUrl }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: rowsPerPage,
                pageIndex: 0,
            },
        },
    });

    return (
        <div className="mb-6 mt-8">
            {data.length > 1 ? (
                <>
                    <MobileTable table={table} options={options} actionBaseUrl={actionBaseUrl} />
                    <DesktopTable table={table} options={options} />
                    {data.length > 1 && data.length > rowsPerPage && (
                        <Pagination table={table} pageCount={data.length} rowsPerPage={rowsPerPage} />
                    )}
                </>
            ) : (
                <div className="flex flex-col justify-center items-center py-5">
                    <img src={noData} alt="No Data" className="w-40 my-5" />
                    <p className="text-lg md:mx-32 mx-5 text-center">No Upcoming Appointments.</p>
                </div>
            )}
        </div>
    );
};

export default BaseTable;
