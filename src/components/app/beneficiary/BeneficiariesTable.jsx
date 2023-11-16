// import React, { useMemo, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Nodata from "../../../assets/images/noData.svg";
// import Avatar from "react-avatar";
// import { avatar, pageSize } from "../../../data/enums";
// import TopBarProgress from "react-topbar-progress-indicator";
// import { calculateAge } from "../../../hooks/useCalculateAge";
// import Pagination from "../Pagination";
// import { capitalizeString } from "../../../utils/capitalizeString";

// TopBarProgress.config({
//     barColors: {
//         0: "#05afb0",
//     },
//     shadowBlur: 5,
// });

// const mobilePageSize = pageSize.Mobile;
// const laptopPageSize = pageSize.Laptop;

// const BeneficiaryTable = ({ beneficiaries }) => {
//     const navigate = useNavigate();
//     const [currentPage, setCurrentPage] = useState(1);

//     const laptopTableData = useMemo(() => {
//         const firstPageIndex = (currentPage - 1) * laptopPageSize;
//         const lastPageIndex = firstPageIndex + laptopPageSize;
//         return beneficiaries.slice(firstPageIndex, lastPageIndex);
//     }, [currentPage, beneficiaries]);

//     const mobileTableData = useMemo(() => {
//         const firstPageIndex = (currentPage - 1) * mobilePageSize;
//         const lastPageIndex = firstPageIndex + mobilePageSize;
//         return beneficiaries.slice(firstPageIndex, lastPageIndex);
//     }, [currentPage, beneficiaries]);

//     return (
//         <>
//             <div className="hidden sm:block flex flex-col mt-8">
//                 <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
//                     <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-md">
//                         <table className="table-auto min-w-full">
//                             <thead>
//                                 <tr>
//                                     <th className="py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50"></th>
//                                     <th className="py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
//                                         <p>Beneficiary</p>
//                                     </th>
//                                     <th className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
//                                         Location
//                                     </th>
//                                     <th className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
//                                         Age
//                                     </th>
//                                     <th className="px-6 py-3 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
//                                         Actions
//                                     </th>
//                                 </tr>
//                             </thead>

//                             <tbody className="bg-white">
//                                 {laptopTableData?.length ? (
//                                     laptopTableData.map((beneficiary, index) => (
//                                         <tr key={index}>
//                                             <td className=" py-4 whitespace-no-wrap border-b border-gray-200">
//                                                 <div className="flex items-center">
//                                                     <div className="mx-4">
//                                                         <Avatar
//                                                             name={`${capitalizeString(
//                                                                 beneficiary?.firstName
//                                                             )} ${capitalizeString(beneficiary?.lastName)}`}
//                                                             color={avatar.BackgroundColor}
//                                                             fgColor={avatar.ForegroundColor}
//                                                             size={avatar.width}
//                                                             round={true}
//                                                         />
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className="py-4 whitespace-no-wrap border-b border-gray-200">
//                                                 <div className="flex items-center">
//                                                     <div>
//                                                         <div className="md:text-lg text-base font-medium leading-5 text-gray-500">
//                                                             {capitalizeString(beneficiary?.firstName)}&nbsp;
//                                                             {capitalizeString(beneficiary?.lastName)}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </td>

//                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                                 <div className="md:text-lg text-base leading-5 text-gray-500">
//                                                     {beneficiary?.city}, {beneficiary?.state}
//                                                 </div>
//                                             </td>

//                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
//                                                 <p className="md:text-lg text-base leading-5 text-gray-500">
//                                                     {calculateAge(beneficiary?.dob)}
//                                                 </p>
//                                             </td>

//                                             <td className="px-6 py-4 md:text-lg text-base leading-5 text-ihs-green whitespace-no-wrap border-b border-gray-200">
//                                                 <Link
//                                                     to={`/beneficiaries/viewbeneficiary/${beneficiary?.id}`}
//                                                 >
//                                                     View
//                                                 </Link>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" className="px-6 py-4 text-center">
//                                             <div className="flex flex-col justify-center items-center py-20">
//                                                 <img src={Nodata} alt="No Data" className="w-40 my-10" />
//                                                 <p className="text-lg md:mx-32 mx-5 text-center">
//                                                     You have no beneficiaries. Add a Beneficiary to begin
//                                                 </p>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                         <Pagination
//                             currentPage={currentPage}
//                             totalCount={beneficiaries.length}
//                             pageSize={mobilePageSize}
//                             onPageChange={(page) => setCurrentPage(page)}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/*Mobile Table*/}
//             <div className="sm:hidden flex flex-col my-8">
//                 <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
//                     <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 rounded-md">
//                         <table className="table-auto min-w-full">
//                             <thead>
//                                 <tr>
//                                     <th className="py-5 text-base font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-ihs-green-shade-50">
//                                         <p></p>
//                                     </th>
//                                 </tr>
//                             </thead>

//                             <tbody className="bg-white">
//                                 {mobileTableData?.length ? (
//                                     mobileTableData.map((beneficiary, index) => (
//                                         <tr
//                                             className="py-4 whitespace-no-wrap border-b even:bg-gray-100"
//                                             key={index}
//                                             onClick={() =>
//                                                 navigate(`/beneficiaries/viewbeneficiary/${beneficiary?.id}`)
//                                             }
//                                         >
//                                             <td className="p-4 ">
//                                                 <div className="flex justify-between items-center text-md text-gray-800">
//                                                     <span>
//                                                         {capitalizeString(beneficiary?.firstName)}&nbsp;
//                                                         {capitalizeString(beneficiary?.lastName)}
//                                                     </span>
//                                                 </div>
//                                                 <div className="text-sm text-gray-500">
//                                                     <p className="flex justify-between mt-1">
//                                                         <span>Relationship</span>
//                                                         <span className="text-gray-800">
//                                                             {beneficiary?.relationship}
//                                                         </span>
//                                                     </p>
//                                                     <p className="flex justify-between mt-1">
//                                                         <span>Address</span>
//                                                         <span className="text-gray-800">
//                                                             {beneficiary?.city}, {beneficiary?.state}
//                                                         </span>
//                                                     </p>
//                                                     <p className="flex justify-between mt-1">
//                                                         <span>Age</span>
//                                                         <span className="text-gray-800">
//                                                             {calculateAge(beneficiary?.dob)} years
//                                                         </span>
//                                                     </p>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="5" className="px-6 py-4 text-center">
//                                             <div className="flex flex-col justify-center items-center py-20">
//                                                 <img src={Nodata} alt="No Data" className="w-40 my-10" />
//                                                 <p className="text-lg md:mx-32 mx-5 text-center">
//                                                     You have no beneficiaries. Add a Beneficiary.
//                                                 </p>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                         <Pagination
//                             currentPage={currentPage}
//                             totalCount={beneficiaries.length}
//                             pageSize={mobilePageSize}
//                             onPageChange={(page) => setCurrentPage(page)}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default BeneficiaryTable;

import { Link } from "react-router-dom";
import { avatar } from "../../../data/enums";
import TopBarProgress from "react-topbar-progress-indicator";
import { calculateAge } from "../../../hooks/useCalculateAge";
import BaseTable from "../table/BaseTable";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const BeneficiariesTable = ({ beneficiaries }) => {
    const rowsPerPage = 10;

    // Array of table headings for the mobile view
    const mobileScreenHeaders = ["Beneficiary"];

    const columns = [
        {
            header: " ", // do not remove the space in between the string
            cell: (cell) => (
                <span className="hidden sm:block px-0">
                    <Avatar
                        name={`${cell.row.original.firstName} ${cell.row.original.lastName}`}
                        color={avatar.BackgroundColor}
                        fgColor={avatar.ForegroundColor}
                        size={avatar.width}
                        round={true}
                    />
                </span>
            ),
        },
        {
            header: "BENEFICIARY",
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            cell: (cell) => <p className="capitalize">{`${cell.getValue()}`}</p>,
        },
        {
            header: "LOCATION",
            accessorKey: "address",
        },
        {
            header: "AGE",
            accessorFn: (row) => calculateAge(row.dob),
        },

        {
            header: "RELATIONSHIP",
            accessorKey: "relationship",
        },
        {
            header: "ACTIONS",
            accessorKey: "actions",
            cell: (cell) => (
                <Link
                    className="text-ihs-green"
                    to={`/beneficiaries/viewbeneficiary/${cell.row.original.id}`}
                >
                    View
                </Link>
            ),
        },
    ];

    return (
        <>
            <BaseTable
                data={beneficiaries}
                columns={columns}
                rowsPerPage={rowsPerPage}
                actionBaseUrl={"viewbeneficiary/"}
                options={{
                    mobileScreenHeaders: mobileScreenHeaders,
                }}
            />
        </>
    );
};

export default BeneficiariesTable;
