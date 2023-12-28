import { flexRender } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import noData from "../../../assets/images/noData.svg";

const MobileTable = ({ table, actionBaseUrl, options, tableLength, tableTitle }) => {
    return (
        // small screen table
        <div className="sm:hidden grid gap-y-2" aria-label="table" role="table">
            <div
                aria-label="table-head"
                className="flex justify-between text-lg font-medium leading-4 tracking-wider text-left bg-ihs-green-shade-100 py-6 px-4"
            >
                {options.mobileScreenHeaders
                    ? options.mobileScreenHeaders.map((header, index) => <span key={index}>{header}</span>)
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
                                                ? `text-xs font-normal rounded-md absolute right-4 top-8`
                                                : ""
                                        } ${cell.column.id.toLowerCase() !== "email" ? "capitalize" : ""}`}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}{" "}
                                    </div>
                                );
                            } else return null;
                        })}
                    </Link>
                );
            })}
            {tableLength < 1 && (
                <div className="flex flex-col justify-center items-center py-5">
                    <img src={noData} alt="No Data" className="w-40 my-5" />
                    <p className="text-lg md:mx-32 mx-5 text-center">No {tableTitle}</p>
                </div>
            )}
        </div>
    );
};

export default MobileTable;
