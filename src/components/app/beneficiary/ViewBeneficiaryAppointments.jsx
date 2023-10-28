// import React, {useEffect, useState} from 'react';
// import {useParams} from "react-router-dom";
// import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
// import TopBarProgress from "react-topbar-progress-indicator";
// import {Tab} from "@headlessui/react";
// import UpcomingAppointmentsTable from "../appointment/UpcomingAppointmentsTable";
// import CompletedAppointmentsTable from "../appointment/CompletedAppointmentsTable";

// function classNames(...classes) {
// 	return classes.filter(Boolean).join(' ')
// }

// TopBarProgress.config({
// 	barColors: {
// 		"0": "#05afb0"
// 	},
// 	shadowBlur: 5
// });

// const ViewBeneficiaryAppointments = () => {
// 	const axiosPrivate = useAxiosPrivate();
// 	const beneficiary = useParams();
// 	const [appointments, setAppointments] = useState([]);
// 	const [loading, setLoading] = useState(false);

// 	useEffect(() => {
// 		const beneficiaryId = beneficiary.beneficiaryId;

// 		let isMounted = true;
// 		const controller = new AbortController();

// 		const getBeneficiaryAppointments = async () => {
// 			try {
// 				const response = await axiosPrivate.get(
// 					`/user/appointments/beneficiary/${beneficiaryId}`,
// 					{
// 						signal: controller?.signal
// 					});

// 				isMounted && setAppointments(response.data.data);
// 				setLoading(false)
// 			} catch (err) {
// 				console.error(err)
// 			}
// 		}

// 		getBeneficiaryAppointments();

// 		return () => {
// 			isMounted = false;
// 			controller.abort();
// 		}
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	return (

// 		<div className="w-full px-2 pb-16 sm:px-0">
// 			{loading && <TopBarProgress/>}
// 			<Tab.Group>
// 				<Tab.List className="flex space-x-1 rounded-md bg-gray-200 p-2 md:w-1/2">

// 					<Tab key="upcoming" className={({selected}) => classNames(
// 						'w-full rounded-md py-2.5 text-sm leading-5 border-0 outline-none',
// 						selected
// 							? 'bg-ihs-green text-white hover:bg-ihs-green hover:text-white'
// 							: 'text-gray-500 hover:text-gray-500'
// 					)}>
// 						Upcoming
// 					</Tab>
// 					<Tab key="completed" className={({selected}) => classNames(
// 						'w-full rounded-md py-2.5 text-sm leading-5 border-0 outline-none',
// 						selected
// 							? 'bg-ihs-green text-white hover:bg-ihs-green hover:text-white'
// 							: 'text-gray-500 hover:text-gray-500'
// 					)}>
// 						Completed
// 					</Tab>
// 				</Tab.List>
// 				<Tab.Panels>

// 					<Tab.Panel>
// 						<UpcomingAppointmentsTable appointmentList={appointments} urlPath='appointments'/>
// 					</Tab.Panel>

// 					<Tab.Panel>
// 						<CompletedAppointmentsTable appointmentList={appointments} urlPath='appointments'/>
// 					</Tab.Panel>

// 				</Tab.Panels>
// 			</Tab.Group>

// 		</div>

// 	);
// };

// export default ViewBeneficiaryAppointments;

import { useParams } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { Tab } from "@headlessui/react";
import UpcomingAppointmentsTable from "../appointment/UpcomingAppointmentsTable";
import CompletedAppointmentsTable from "../appointment/CompletedAppointmentsTable";
import useFetch from "../../../hooks/useFetch";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const ViewBeneficiaryAppointments = () => {
  const params = useParams();
  const [errMsg, setErrMsg] = useState("");
  const { isSuccess, isLoading, data, isError, error } = useFetch(
    `/user/appointments/beneficiary/${params.beneficiaryId}`,
    `appointments, ${params.beneficiaryId}`
  );

  return (
    <div className="w-full px-2 pb-16 sm:px-0">
      <p
        className={
          errMsg
            ? "rounded-md p-4 mb-4 bg-ihs-green-shade-200 text-red-500 font-normal text-lg"
            : "absolute -left-[99999px]"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>

      {isLoading && <TopBarProgress />}
      {isError && setErrMsg(error)}
      {isSuccess && (
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-md bg-gray-200 p-2 md:w-1/2">
            <Tab
              key="upcoming"
              className={({ selected }) =>
                classNames(
                  "w-full rounded-md py-2.5 text-sm leading-5 border-0 outline-none",
                  selected
                    ? "bg-ihs-green text-white hover:bg-ihs-green hover:text-white"
                    : "text-gray-500 hover:text-gray-500"
                )
              }
            >
              Upcoming
            </Tab>
            <Tab
              key="completed"
              className={({ selected }) =>
                classNames(
                  "w-full rounded-md py-2.5 text-sm leading-5 border-0 outline-none",
                  selected
                    ? "bg-ihs-green text-white hover:bg-ihs-green hover:text-white"
                    : "text-gray-500 hover:text-gray-500"
                )
              }
            >
              Completed
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              <UpcomingAppointmentsTable
                appointmentList={data}
                urlPath="appointments"
              />
            </Tab.Panel>

            <Tab.Panel>
              <CompletedAppointmentsTable
                appointmentList={data}
                urlPath="appointments"
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
};

export default ViewBeneficiaryAppointments;
