import TopBarProgress from "react-topbar-progress-indicator";
import { Tab } from "@headlessui/react";
import BaseTable from "../../table/BaseTable";
import { Link } from "react-router-dom";
import { appointmentStatus, avatar, booleanString } from "../../../../data/enums";
import { getDate } from "../../../../hooks/useFormatDate";
import Avatar from "react-avatar";
import {
    filterInByProperty,
    filterOutByProperty,
    sortInDescOrder,
} from "../../../../utils/utililtyFunctions";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const AppointmentTable = ({ appointments }) => {
    const rowsPerPage = 10; // number of appointments per page

    // filter appointments
    const upcomingAppointments = filterOutByProperty(appointments, "status", appointmentStatus.Completed);
    let completedAppointments = filterInByProperty(appointments, "status", appointmentStatus.Completed);
    completedAppointments = sortInDescOrder(completedAppointments);

    const mobileScreenHeaders = ["Beneficiaries", "Status"];

    const columns = [
        {
            header: " ", // do not remove the space in between the string
            cell: (cell) => (
                <span className="hidden sm:block px-0">
                    <Avatar
                        name={`${cell.row.original.beneficiaryName}`}
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
            accessorKey: "beneficiaryName",
        },
        {
            header: "PURPOSE",
            accessorKey: "serviceName",
        },
        {
            header: "DATE",
            accessorFn: (row) => getDate(row.date),
        },
        {
            header: "STATUS",
            accessorKey: "status",
            cell: (cell) => (
                <span
                    className={`px-2 py-1 break-normal rounded text-xs ${
                        cell.row.original.completed.toString() === booleanString.True
                            ? "text-green-900 bg-green-100"
                            : cell.getValue() === appointmentStatus.Confirmed
                            ? "text-blue-900 bg-blue-100"
                            : "text-red-900 bg-red-100"
                    }`}
                >
                    {cell.row.original.completed.toString() === booleanString.True
                        ? appointmentStatus.Completed
                        : cell.getValue()}
                </span>
            ),
        },
        {
            header: "TIME",
            accessorKey: "time",
        },
        {
            header: "ACTIONS",
            accessorKey: "actions",
            cell: (cell) => (
                <Link className="text-ihs-green" to={`/appointments/viewappointment/${cell.row.original.id}`}>
                    View
                </Link>
            ),
        },
    ];
    return (
        <div className="w-full px-2 pb-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-md bg-gray-200 p-2 md:max-w-[40%]">
                    <Tab
                        key="upcoming"
                        className={({ selected }) =>
                            classNames(
                                "w-full rounded-md py-2 text-sm leading-5 border-0 outline-none",
                                selected
                                    ? "bg-ihs-green text-white hover:bg-ihs-green hover:text-white"
                                    : "text-gray-500 hover:text-gray-500 hover:bg-transparent"
                            )
                        }
                    >
                        Upcoming
                    </Tab>
                    <Tab
                        key="completed"
                        className={({ selected }) =>
                            classNames(
                                "w-full rounded-md py-2 text-sm leading-5 border-0 outline-none",
                                selected
                                    ? "bg-ihs-green text-white hover:bg-ihs-green hover:text-white"
                                    : "text-gray-500 hover:text-gray-500 hover:bg-transparent"
                            )
                        }
                    >
                        Completed
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <BaseTable
                            data={upcomingAppointments}
                            columns={columns}
                            rowsPerPage={rowsPerPage}
                            actionBaseUrl={"/appointments/viewappointment/"}
                            options={{
                                excludeInDesktopTable: "time",
                                positionedColumn: "status",
                                mobileScreenHeaders: mobileScreenHeaders,
                            }}
                            tableTitle={"Upcoming Appointment"}
                        />
                    </Tab.Panel>

                    <Tab.Panel>
                        <BaseTable
                            data={completedAppointments}
                            columns={columns}
                            rowsPerPage={rowsPerPage}
                            actionBaseUrl={"/appointments/viewappointment/"}
                            options={{
                                excludeInDesktopTable: "time",
                                positionedColumn: "status",
                                mobileScreenHeaders: mobileScreenHeaders,
                            }}
                            tableTitle={"Completed Appointment"}
                        />{" "}
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default AppointmentTable;
