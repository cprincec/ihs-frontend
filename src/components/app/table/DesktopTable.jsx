import { flexRender } from "@tanstack/react-table";

const DesktopTable = ({ table, options }) => {
    return (
        <div className="hidden sm:block">
            <table className="w-full" aria-label="table" role="table">
                {/* table head */}
                <thead className="bg-ihs-green-shade-100">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id} className="border-b border-gray-200">
                            {headerGroup.headers.map((header) =>
                                // filter out the column that should not be shown on large screen
                                !options.excludeInDesktopTable ||
                                header.id !== options.excludeInDesktopTable ? (
                                    <th key={header.id} aria-label="table-head" className="text-left">
                                        <p className="px-2 py-4 ">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </p>
                                    </th>
                                ) : null
                            )}
                        </tr>
                    ))}
                </thead>

                {/* table body */}
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b border-gray-200">
                            {row.getVisibleCells().map((cell) =>
                                // filter out the column that should not be shown on large screen
                                !options.excludeInDesktopTable ||
                                cell.column.id !== options.excludeInDesktopTable ? (
                                    <td
                                        className="break-all"
                                        aria-label="table-row"
                                        role="cell"
                                        key={cell.id}
                                    >
                                        <div
                                            className={`p-2 text-gray-600 ${
                                                cell.column.id.toLowerCase() !== "email" ? "capitalize" : ""
                                            }`}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </div>
                                    </td>
                                ) : null
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DesktopTable;
