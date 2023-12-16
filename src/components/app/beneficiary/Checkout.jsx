import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ChevronLeftIcon, ShoppingBagIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import PricingDetails from "../../website/pricing/PricingDetails";
import CoverageScope from "../CoverageScope";
import PageHeading from "../../shared/PageHeading";

const Checkout = () => {
    const navigate = useNavigate();
    useEffect(() => {
        console.log("data");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HelmetProvider>
            <>
                <Helmet>
                    <title>My Beneficiaries | IHS Dashboard</title>
                    <link rel="canonical" href="https://www.ihsmia.com/" />
                </Helmet>

                <div className="lg:px-20 lg:py-4 md:px-10 p-3">
                    <PageHeading
                        pageName={"Add Health Coverage"}
                        previousPageName={"Beneficiary"}
                        previousUrl={-1}
                        icon={ShoppingBagIcon}
                    />
                    <div className="flex md:justify-start justify-center md:items-start items-center">
                        <div className="flex-1">
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
