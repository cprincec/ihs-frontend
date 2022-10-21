import React, {useEffect, useState} from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import {useParams} from "react-router-dom";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const PricingDetails = () => {
	const axiosPrivate = useAxiosPrivate();
	const [priceId, setPriceId] = useState('');
	const {loggedInUser, beneficiaries} = useAuth();
	const [loading, setLoading] = useState(false);
	const [beneficiarySubscriptionStatus, setBeneficiarySubscriptionStatus] = useState(false);
	const beneficiary = useParams();
	const beneficiaryId = beneficiary.beneficiaryId;

	const handleCheckout = async (e) => {
		e.preventDefault();

		setLoading(true);

		try	{
			const res = await axiosPrivate.post("/checkout",

				JSON.stringify( {
					priceId: priceId,
					customerId: loggedInUser.customerId,
					userId: loggedInUser.id,
					beneficiaryId: beneficiaryId,
					email: loggedInUser.email
				}),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			)

			setLoading(false);

			const body = await res.data
			window.location.href = body.url

		} catch (e) {
			console.log(`Uncaught Exception ${e}`);
		}
	}

	useEffect(() => {
		const beneficiary = beneficiaries.filter((beneficiary) => beneficiary.id === beneficiaryId);

			if (!beneficiary[0]?.subscription?.status || beneficiary[0]?.subscription?.status !== 'active') {
				setBeneficiarySubscriptionStatus(false)
			} else {
				setBeneficiarySubscriptionStatus(true)
			}
	}, [beneficiaries, beneficiaryId, loggedInUser])


	return (
		<section className="bg-white mb-20">
			{loading && <TopBarProgress/>}
			<div className="container px-6 py-8 mx-auto">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div>
						<h2 className="md:text-3xl text-xl font-bold text-gray-800">Simple, transparent pricing</h2>
						<p className="mt-4 text-gray-500 font-thin">No Contracts. No Hidden Fees.</p>
					</div>
				</div>

				<div className="grid gap-6 mt-16 sm:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
					<div
							 className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Bi-Weekly Coverage</p>
						<h4 className="mt-2 text-4xl font-semibold text-gray-800 ">$50 <span
							className="text-base font-normal text-gray-600 capitalize">/ Beneficiary / 2 Weeks
						</span></h4>
						<p className="mt-4 text-gray-500">Coverage Description</p>

						<div className="mt-8 space-y-8">
							<div className="flex items-center">

								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature One</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700 ">Feature Two</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Three</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Four</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Five</span>
							</div>
						</div>

						<form onSubmit={handleCheckout} onFocus={(e) => setPriceId("price_1LrhMVIGWAGjsS3FZXla9scy")}>
							<input type="hidden" name="priceId" id="priceId" value="price_1LrhMVIGWAGjsS3FZXla9scy" />
							<button disabled={beneficiarySubscriptionStatus} className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Subscribe
							</button>
						</form>
					</div>

					<div
						className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Monthly Coverage</p>
						<h4 className="mt-2 text-4xl font-semibold text-gray-800 ">$100 <span
							className="text-base font-normal text-gray-600 capitalize">/ Beneficiary / Month
						</span></h4>
						<p className="mt-4 text-gray-500">Coverage Description</p>

						<div className="mt-8 space-y-8">
							<div className="flex items-center">

								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature One</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700 ">Feature Two</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Three</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Four</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Five</span>
							</div>
						</div>

						<form onSubmit={handleCheckout} onFocus={(e) => setPriceId("price_1LrhTJIGWAGjsS3FrpT98sG8")}>
							<input type="hidden" name="priceId" id="priceId" value="price_1LrhTJIGWAGjsS3FrpT98sG8" />
							<button disabled={beneficiarySubscriptionStatus} className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Subscribe
							</button>
						</form>
					</div>

					<div
						className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Yearly Coverage</p>
						<h4 className="mt-2 text-4xl font-semibold text-gray-800 ">$1200 <span
							className="text-base font-normal text-gray-600 capitalize">/ Beneficiary / Year
						</span></h4>
						<p className="mt-4 text-gray-500">Coverage Description</p>

						<div className="mt-8 space-y-8">
							<div className="flex items-center">

								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature One</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700 ">Feature Two</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Three</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Four</span>
							</div>

							<div className="flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-ihs-green" viewBox="0 0 20 20"
										 fill="currentColor">
									<path fillRule="evenodd"
												d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
												clipRule="evenodd"/>
								</svg>

								<span className="mx-4 text-gray-700">Feature Five</span>
							</div>
						</div>

						<form onSubmit={handleCheckout} onFocus={(e) => setPriceId("price_1LrhbqIGWAGjsS3FN6qfb8fW")}>
							<input type="hidden" name="priceId" id="priceId" value="price_1LrhbqIGWAGjsS3FN6qfb8fW" />
							<button disabled={beneficiarySubscriptionStatus} className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
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