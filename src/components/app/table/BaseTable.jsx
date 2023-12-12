import { useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";
import Pagination from "./Pagination";
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
const BaseTable = ({ data, columns, rowsPerPage, options, actionBaseUrl, tableTitle }) => {
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
            <>
                <MobileTable
                    tableLength={data.length}
                    table={table}
                    options={options}
                    actionBaseUrl={actionBaseUrl}
                    tableTitle={tableTitle}
                />
                <DesktopTable
                    table={table}
                    options={options}
                    tableLength={data.length}
                    tableTitle={tableTitle}
                />
                {data.length > 0 && data.length > rowsPerPage && (
                    <Pagination table={table} pageCount={data.length} rowsPerPage={rowsPerPage} />
                )}
            </>
        </div>
    );
};

export default BaseTable;
