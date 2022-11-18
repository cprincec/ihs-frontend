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
				<Tab.List className="flex space-x-1 rounded-xl bg-white p-1">

					<Tab key="upcoming" className={({selected}) => classNames(
						'w-full md:w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-ihs-green',
						'ring-white ring-opacity-60 ring-offset-2 ring-offset-ihs-green-shade-400 focus:outline-none focus:ring-2',
						selected
							? 'bg-ihs-green text-white shadow'
							: 'text-ihs-green hover:bg-white/[0.12] hover:text-white'
					)}>
						Upcoming
					</Tab>
					<Tab key="completed" className={({selected}) => classNames(
						'w-full md:w-1/4 rounded-lg py-2.5 text-sm font-medium leading-5 text-ihs-green',
						'ring-white ring-opacity-60 ring-offset-2 ring-offset-ihs-green-shade-400 focus:outline-none focus:ring-2',
						selected
							? 'bg-ihs-green text-white shadow'
							: 'text-ihs-green hover:bg-white/[0.12] hover:text-white ring-0'
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