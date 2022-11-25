import React from 'react';

const Faq = () => {
	return (
		<div>
			<div className="md:py-40 pb-20 pt-8">
				<div className="max-w-[1240] mx-auto">
					<div className="flex justify-center items-start">
						<h2 className="sm:text-2xl md:text-3xl font-semibold pb-2 mb-10 text-gray-800 border-b-2 border-b-ihs-green rounded-lg">
							About IHS
						</h2>
					</div>
					<div className="lg:px-32 md:px-20 px-5 ">
						<details className="bg-white border rounded-md open:bg-gray-50 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								How much do the services cost?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									The IHS Services & Coverage cost $50 bi-weekly / $100 monthly / $1200 annually per term (1 Year).
								</p>
							</div>
						</details>

						<details className="bg-white border rounded-md open:bg-gray-50 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								What happens if I cancel mid-term?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Each subscription runs for a year, and users are responsible for outstanding balances upon cancellation (see Section 9 of Terms).
								</p>
							</div>
						</details>

						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Does IHS sub-contract to different Health Workers & Providers?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									No; for privacy & security reasons, IHS maintains the same staff, workers & partners.
								</p>
							</div>
						</details>

						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Can my Beneficiaries keep their existing Doctor/Provider?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Yes; though we work with an expansive network of providers, we are amenable to covering existing providers outside the network.
								</p>
							</div>
						</details>

						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								To what extent is data collected, used and protected?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Please review Section 13 (Privacy & Security) of our Terms and also visit our Privacy Policy page.
								</p>
							</div>
						</details>
					</div>

					<div className="flex justify-center items-start">
						<h2 className="sm:text-2xl md:text-3xl font-semibold pb-2 mt-20 mb-10 text-gray-800 border-b-2 border-b-ihs-green rounded-lg">
							Beneficiaries
						</h2>
					</div>
					<div className="lg:px-32 md:px-20 px-5">
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Can Users list others besides parents as Beneficiaries?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Yes; the term extends to all related parties. Consent is also requested from listed beneficiaries, as required by Nigerian laws.
								</p>
							</div>
						</details>
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Can Users list more than one Beneficiary?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Yes; Users can be ascribed as many Beneficiaries as payment affords.
								</p>
							</div>
						</details>
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Can Users replace a Beneficiary with another?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Changes to Beneficiary coverage can only be made upon completion/expiration of term.
								</p>
							</div>
						</details>
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Are Beneficiaries still covered if outside their listed state/city?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500 ">
								<p>
									Yes; IHS coverage & services extend across all 37 states/territories in Nigeria.
								</p>
							</div>
						</details>
					</div>

					<div className="flex justify-center items-start">
						<h2 className="sm:text-2xl md:text-3xl font-semibold pb-2 mt-20 mb-10 text-gray-800 border-b-2 border-b-ihs-green rounded-lg">
							Our People
						</h2>
					</div>
					<div className="lg:px-32 md:px-20 px-5 ">
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Are there Doctors within the group?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500  ">
								<p>Yes; our core team spans a diverse group of professionals including medical practitioner(s), health regulator(s), lawyer(s), etc.</p>
							</div>
						</details>
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Can Users/Beneficiaries identify their assigned person(s)?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500  ">
								<p>Yes; please review the About Us page for details on the core team. Also, Users are notified of assigned Health Worker(s), with subsequent emails signed off accordingly.</p>
							</div>
						</details>
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Are Health Workers certified?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500  ">
								<p>Yes; all assigned workers are trained, reviewed and certified/licensed by respective regulatory bodies.</p>
							</div>
						</details>
						<details className="bg-white border rounded-md open:bg-gray-100 duration-300 my-2">
							<summary className="bg-inherit text-gray-800 px-5 py-3 lg:text-xl cursor-pointer">
								Can Users get IHS' full list of provider network?
							</summary>
							<div className="bg-white px-5 py-3 border border-gray-100 lg:text-xl text-gray-500  ">
								<p>Users will be given a list of providers within the region of service requested; our expanded (full) list is proprietary.</p>
							</div>
						</details>
					</div>
				</div>
			</div>


		</div>
	);
};

export default Faq;