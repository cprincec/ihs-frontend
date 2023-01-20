import useAuth from "../../../hooks/useAuth";
import TopBarProgress from "react-topbar-progress-indicator";
import {Tab} from "@headlessui/react";
import UpcomingAppointmentsTable from "./UpcomingAppointmentsTable";
import CompletedAppointmentsTable from "./CompletedAppointmentsTable";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

TopBarProgress.config({
		barColors: {
				"0": "#05afb0"
		},
		shadowBlur: 5
});

const AppointmentTable = () => {
	const {appointments} = useAuth();

	return (
		<div className="w-full px-2 pb-16 sm:px-0">

			<Tab.Group>
				<Tab.List className="flex space-x-1 rounded-md bg-gray-200 p-2 md:w-1/2">

					<Tab key="upcoming" className={({selected}) => classNames(
						'w-full rounded-md py-2.5 text-sm leading-5 border-0 outline-none',
						selected
							? 'bg-ihs-green text-white hover:bg-ihs-green hover:text-white'
							: 'text-gray-500 hover:text-gray-500'
					)}>
						Upcoming
					</Tab>
					<Tab key="completed" className={({selected}) => classNames(
						'w-full rounded-md py-2.5 text-sm leading-5 border-0 outline-none',
						selected
							? 'bg-ihs-green text-white hover:bg-ihs-green hover:text-white'
							: 'text-gray-500 hover:text-gray-500'
					)}>
						Completed
					</Tab>
				</Tab.List>
				<Tab.Panels>

					<Tab.Panel>
						<UpcomingAppointmentsTable appointmentList={appointments} urlPath='appointments' />
					</Tab.Panel>

					<Tab.Panel>
						<CompletedAppointmentsTable appointmentList={appointments} urlPath='appointments' />
					</Tab.Panel>

				</Tab.Panels>
			</Tab.Group>

		</div>
	);
};

export default AppointmentTable;