import { useParams } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { Tab } from "@headlessui/react";
import UpcomingAppointmentsTable from "../appointment/UpcomingAppointmentsTable";
import CompletedAppointmentsTable from "../appointment/CompletedAppointmentsTable";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";

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
