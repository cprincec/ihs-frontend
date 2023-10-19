import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddBeneficiary from "./AddBeneficiary";
import ViewBeneficiary from "./ViewBeneficiary";
import UpdateBeneficiary from "./UpdateBeneficiary";
import BeneficiaryTable from "./BeneficiaryTable";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Checkout from "./Checkout";
import useFetch from "../../../hooks/useFetch";
import TopBarProgress from "react-topbar-progress-indicator";
import { useState } from "react";

const Beneficiaries = () => {
  return (
    <Routes>
      <Route index element={<ParentContent />} />
      <Route path="/addbeneficiary" element={<AddBeneficiary />} />
      <Route
        path="/viewbeneficiary/:beneficiaryId"
        element={<ViewBeneficiary />}
      />
      <Route
        path="/updatebeneficiary/:beneficiaryId"
        element={<UpdateBeneficiary />}
      />
      <Route
        path="/updatebeneficiary/:beneficiaryId/addhealthcoverage"
        element={<Checkout />}
      />
    </Routes>
  );
};

const ParentContent = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const { isSuccess, isLoading, data, isError, error } = useFetch(
    "/user/beneficiaries",
    "beneficiaries"
  );

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>My Beneficiaries | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmdinc.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {/*Beneficiaries Section*/}
          <div className="xs:flex-col justify-center md:flex items-center md:justify-between my-5 lg:mt-10">
            <h2 className="md:text-2xl text-xl py-2 md:py-2">
              Your Beneficiaries
            </h2>
            <div className="space-x-2">
              <button
                className="py-3 md:px-4 px-2 text-sm"
                onClick={() => navigate("/appointments/bookappointment")}
              >
                Book Appointment
              </button>
              <button
                className="py-3 md:px-4 px-2 text-sm"
                onClick={() => navigate("/beneficiaries/addbeneficiary")}
              >
                Add Beneficiary
              </button>
            </div>
          </div>

          <hr className="my-10" />

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

          {/*Beneficiaries Table*/}
          {isLoading && <TopBarProgress />}
          {isError && setErrMsg(error)}
          {isSuccess && <BeneficiaryTable beneficiaries={data} />}
        </div>
      </>
    </HelmetProvider>
  );
};

export default Beneficiaries;
