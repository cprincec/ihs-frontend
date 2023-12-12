import React, { useEffect, useState } from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Capacitor } from "@capacitor/core";
import useFetch from "../../../hooks/useFetch";
import usePost from "../../../hooks/usePost";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { useQueryClient } from "@tanstack/react-query";

TopBarProgress.config({
    barColors: {
        0: "#05afb0",
    },
    shadowBlur: 5,
});

const biweeklyPricing = process.env.REACT_APP_BIWEEKLY_PRICING;
const monthlyPricing = process.env.REACT_APP_MONTHLY_PRICING;
const yearlyPricing = process.env.REACT_APP_YEARLY_PRICING;

const PricingDetails = () => {
    const loggedInUser = useSelector((state) => state.auth.loggedInUser);
    const [priceId, setPriceId] = useState("");
    const [platform, setPlatform] = useState("");
    const [disableSubButton, setDisableSubButton] = useState(true);
    const [errMsg, setErrMsg] = useState("");

    const beneficiary = useParams();
    const beneficiaryId = beneficiary.beneficiaryId;

    const { isSuccess, isLoading, data, isError } = useFetch(
        `/user/beneficiary/${beneficiaryId}`,
        `beneficiary, ${beneficiaryId}`
    );
    const checkoutMutation = usePost();
    const queryClient = useQueryClient();

    useEffect(() => {
        setPlatform(Capacitor.getPlatform());
    }, []);

    useEffect(() => {
        setDisableSubButton(isSuccess && data?.subscription?.status === "active");
    }, [isSuccess, data]);

    const redirectToWebApp = () => {
        window.alert("Visit the web app at https://app.ihsmia.com");
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (platform !== "web") {
            redirectToWebApp();
            return;
        }

        checkoutMutation.mutate(
            {
                url: "/checkout",
                body: {
                    priceId: priceId,
                    customerId: loggedInUser.customerId,
                    userId: loggedInUser.id,
                    beneficiaryId: beneficiaryId,
                    email: loggedInUser.email,
                },
            },

            {
                onError: () => setErrMsg("Something went wrong. Try again"),
                onSuccess: (data) => {
                    window.location.href = data.data.url;
                    queryClient.invalidateQueries(["beneficiaries"]);
                    queryClient.invalidateQueries([`beneficiary, ${beneficiaryId}`]);
                },
            }
        );
    };

    return (
        <section className="bg-white mb-20">
            {(isLoading || checkoutMutation.isLoading) && <TopBarProgress />}
            {isError && setErrMsg("Failed to get beneficiary.")}
            {/* Error Handling */}
            <p
                className={
                    errMsg
                        ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
                        : "absolute -left-[99999px]"
                }
                aria-live="assertive"
            >
                <span className="flex items-center">
                    <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
                    {errMsg}
                </span>
            </p>

            <div className="container px-6 py-8 mx-auto">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div>
                        <h2 className="md:text-3xl text-xl font-bold text-gray-800">Transparent Pricing,</h2>
                        <p className="mt-1 text-gray-500 font-thin">No Hidden Fees.</p>
                        <p className="mt-1 text-gray-500 font-thin">
                            Our service fees are $1200/term (annually) and we provide the below payment
                            options. Please contact us for multi-Beneficiary discounts, clarifications and/or
                            any required accommodation.
                        </p>
                    </div>
                </div>

                <div className="grid gap-6 mt-16 sm:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
                        <p className="text-lg font-medium text-gray-800">Bi-Weekly Payment</p>
                        <h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">
                            $50
                            <span className="font-light text-sm text-gray-600 capitalize">/ Beneficiary</span>
                        </h4>

                        <form onSubmit={handleCheckout}>
                            <button
                                disabled={disableSubButton}
                                className="disabled:bg-slate-400 disabled:border-slate-200
											disabled:hover:text-white bg-ihs-green w-full px-4 py-2 mt-10
											font-medium tracking-wide text-white capitalize transition-colors
											duration-200 transform rounded-md focus:outline-none disabled:cursor-not-allowed"
                                onClick={() => setPriceId(biweeklyPricing)}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
                        <p className="text-lg font-medium text-gray-800">Monthly Payment</p>
                        <h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">
                            $100{" "}
                            <span className="font-light text-sm text-gray-600 capitalize">/ Beneficiary</span>
                        </h4>

                        <form onSubmit={handleCheckout}>
                            <button
                                disabled={disableSubButton}
                                className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white
											bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize
											transition-colors duration-200 transform rounded-md focus:outline-none disabled:cursor-not-allowed"
                                onClick={() => setPriceId(monthlyPricing)}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    <div className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
                        <p className="text-lg font-medium text-gray-800">Yearly Payment</p>
                        <h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">
                            $1200{" "}
                            <span className="font-light text-sm text-gray-600 capitalize">/ Beneficiary</span>
                        </h4>

                        <form onSubmit={handleCheckout}>
                            <button
                                disabled={disableSubButton}
                                className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white
											bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize
											transition-colors duration-200 transform rounded-md focus:outline-none disabled:cursor-not-allowed"
                                onClick={() => setPriceId(yearlyPricing)}
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingDetails;
