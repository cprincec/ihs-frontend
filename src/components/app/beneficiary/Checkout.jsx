import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChevronLeftIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import PricingDetails from "../../website/pricing/PricingDetails";
import CoverageScope from "../CoverageScope";

const Checkout = () => {
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>My Beneficiaries | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>

        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          <button
            className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon className="w-6" />{" "}
            <p className="text-lg px-5">Back</p>
          </button>
          <div className="flex md:justify-start justify-center md:items-start items-center">
            <div className="flex-1">
              <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                <div className="flex">
                  <ShoppingBagIcon className="md:w-14 w-6 md:ml-10 ml-3" />
                  <h3 className="md:text-3xl text-xl py-8 md:px-8 px-2">
                    Add Health Coverage
                  </h3>
                </div>
              </div>

              <div className="my-10 space-y-0">
                <PricingDetails />
                <CoverageScope />
              </div>
            </div>
          </div>
        </div>
      </>
    </HelmetProvider>
  );
};

export default Checkout;
