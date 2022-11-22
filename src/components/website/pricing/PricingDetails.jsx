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
						<h2 className="md:text-3xl text-xl font-bold text-gray-800">Transparent Pricing,</h2>
						<p className="mt-1 text-gray-500 font-thin">No Hidden Fees.</p>
					</div>
				</div>

				<div className="grid gap-6 mt-16 sm:gap-8 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
					<div
							 className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Bi-Weekly Payment</p>
						<h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">
							$50
							<span className="font-light text-sm text-gray-600 capitalize">
								/ Beneficiary
							</span>
						</h4>

						<form onSubmit={handleCheckout} onFocus={(e) => setPriceId("price_1LyxXsIGWAGjsS3FsxeZJGoG")}>
							<input type="hidden" name="priceId" id="priceId" value="price_1LyxXsIGWAGjsS3FsxeZJGoG" />
							<button disabled={beneficiarySubscriptionStatus} className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Subscribe
							</button>
						</form>
					</div>

					<div
						className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Monthly Payment</p>
						<h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">$100 <span
							className="font-light text-sm text-gray-600 capitalize">/ Beneficiary
						</span></h4>

						<form onSubmit={handleCheckout} onFocus={(e) => setPriceId("price_1LyxXlIGWAGjsS3FOgUK9mtv")}>
							<input type="hidden" name="priceId" id="priceId" value="price_1LyxXlIGWAGjsS3FOgUK9mtv" />
							<button disabled={beneficiarySubscriptionStatus} className="disabled:bg-slate-400 disabled:border-slate-200 disabled:hover:text-white bg-ihs-green w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Subscribe
							</button>
						</form>
					</div>

					<div
						className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Yearly Payment</p>
						<h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">$1200 <span
							className="font-light text-sm text-gray-600 capitalize">/ Beneficiary
						</span></h4>

						<form onSubmit={handleCheckout} onFocus={(e) => setPriceId("price_1LyxWsIGWAGjsS3FApAVIdPc")}>
							<input type="hidden" name="priceId" id="priceId" value="price_1LyxWsIGWAGjsS3FApAVIdPc" />
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