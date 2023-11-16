import { flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";

const MobileTable = ({ table, actionBaseUrl, options }) => {
    return (
        // small screen table
        <div className="sm:hidden grid gap-y-2" aria-label="table" role="table">
            <div
                aria-label="table-head"
                className="flex justify-between text-base font-medium leading-4 tracking-wider text-left bg-ihs-green-shade-100 p-6 "
            >
                {options.mobileScreenHeaders
                    ? options.mobileScreenHeaders.map((header) => <span>{header}</span>)
                    : null}
            </div>

            {table.getRowModel().rows.map((row) => {
                return (
                    <Link
                        key={row.id}
                        to={`${actionBaseUrl}${row.original.id}`} // extract the value of the id property
                        className="odd:bg-gray-100 p-4 relative"
                        aria-label="table-row"
                    >
                        {row.getVisibleCells().map((cell, index) => {
                            // exclude the actions button from the displayed items
                            if (!(cell.column.id === "actions")) {
                                return (
                                    <div
                                        aria-label="table-row "
                                        role="cell"
                                        key={cell.id}
                                        className={`mb-1 ${
                                            index === 1 ? "text-md text-gray-800" : "text-sm text-gray-500"
                                        } ${
                                            // position item to the top right
                                            options.positionedColumn &&
                                            options.positionedColumn === cell.column.id
                                                ? `text-xs font-normal capitalize rounded-md absolute right-4 top-8`
                                                : ""
                                        }`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}{" "}
                                        {cell.column.id.toLowerCase() === "age" ? "years" : ""}
                                    </div>
                                );
                            } else return null;
                        })}
                    </Link>
                );
            })}
        </div>
    );
};

export default MobileTable;
