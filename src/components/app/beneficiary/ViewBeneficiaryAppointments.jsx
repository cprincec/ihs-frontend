import { useParams } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import { useState } from "react";
import AppointmentTable from "../appointment/tables/AppointmentTable";
import Spinner from "../SVGs/Spinner";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const ViewBeneficiaryAppointments = () => {
    const params = useParams();
    const [errMsg, setErrMsg] = useState("");
    const { isLoading, data, isError, error } = useFetch(
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
            {isError && setErrMsg(error)}
            {isLoading ? (
                <div className="w-full min-h-40 p-6 grid items-center">
                    <Spinner className="" style={{ width: "10%", margin: "0 auto" }} />
                </div>
            ) : (
                <AppointmentTable appointments={data === "Appointment not found" ? [] : data} />
            )}
        </div>
    );
};

export default ViewBeneficiaryAppointments;
