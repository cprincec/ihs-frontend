import React from "react";
import { useParams } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import BeneficiariesTable from "../beneficiary/BeneficiariesTable";

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const ViewUserBeneficiaries = () => {
  const params = useParams();
  const userId = params.userId;

  const { isLoading, isSuccess, data } = useFetch(
    `/admin/user/${userId}/beneficiaries`,
    `userBeneficiaries, ${userId}`
  );

  return (
    <>
      {isLoading && <TopBarProgress />}
      {isSuccess && <BeneficiariesTable beneficiaries={data} />}
    </>
  );
};

export default ViewUserBeneficiaries;
