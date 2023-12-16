import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import BeneficiariesTable from "../beneficiary/table/BeneficiariesTable";
import Spinner from "../SVGs/Spinner";

const ViewUserBeneficiaries = () => {
    const params = useParams();
    const userId = params.userId;

    const { isSuccess, data } = useFetch(
        `/admin/user/${userId}/beneficiaries`,
        `userBeneficiaries, ${userId}`
    );

    return (
        <>
            {isSuccess ? (
                <BeneficiariesTable beneficiaries={data} />
            ) : (
                <div className="w-full min-h-40 p-6 grid items-center">
                    <Spinner className="" style={{ width: "10%", margin: "0 auto" }} />
                </div>
            )}
        </>
    );
};

export default ViewUserBeneficiaries;
