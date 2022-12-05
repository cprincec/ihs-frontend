import React from 'react';
import TopBarProgress from "react-topbar-progress-indicator";
import {Link} from "react-router-dom";
import CoverageScope from "../../app/CoverageScope";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const PricingDetails = () => {

	return (
		< >
		<section className="bg-white mb-10">
			<div className="container px-6 py-8 mx-auto">
				<div className="sm:flex sm:items-center sm:justify-between">
					<div>
						<h2 className="md:text-3xl text-xl font-bold text-gray-800">Transparent Pricing,</h2>
						<p className="mt-1 text-gray-500 font-thin">No Hidden Fees.</p>
						<p className="mt-1 text-gray-500 font-thin">Our service fees are $1200/term (annually) and we provide the below
							payment options. Please contact us for multi-Beneficiary discounts,
							clarifications and/or any required accommodation.</p>
					</div>
				</div>

				<div className="grid gap-6 mt-16 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
					<div
							 className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Bi-Weekly Payment</p>
						<h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">
							$50
							<span className="font-light text-sm text-gray-600 capitalize">
								/ Beneficiary
							</span>
						</h4>

						<Link to="/signup">
							<button
								className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Get Started
							</button>
						</Link>
					</div>

					<div
						className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Monthly Payment</p>
						<h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">$100 <span
							className="font-light text-sm text-gray-600 capitalize">/ Beneficiary
						</span></h4>

						<Link to="/signup">
							<button
								className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Get Started
							</button>
						</Link>
					</div>

					<div
						className="px-6 py-4 transition-colors duration-200 transform rounded-lg hover:bg-ihs-green-shade-50 border shadow">
						<p className="text-lg font-medium text-gray-800">Yearly Payment</p>
						<h4 className="mt-2 md:text-3xl text-lg font-semibold text-gray-800 ">$1200 <span
							className="font-light text-sm text-gray-600 capitalize">/ Beneficiary
						</span></h4>

						<Link to="/signup">
							<button
								className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded-md focus:outline-none ">
								Get Started
							</button>
						</Link>
					</div>

				</div>
			</div>
		</section>
		<CoverageScope />
	</>
	);
};

export default PricingDetails;