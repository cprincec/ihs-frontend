import React, {useState} from 'react';
import {ChevronLeftIcon, ClipboardCopyIcon} from "@heroicons/react/outline";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Spinner from "../Spinner";

const ADD_SERVICE = "/admin/service/create"

const AddService = () => {
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await axiosPrivate.post(ADD_SERVICE,
				JSON.stringify({
					name, category}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true
				}
			);

			setName('');

			setLoading(false);
			// setSuccess(true);

			navigate('/servicess')

		} catch (err) {
			if (!err.response) {
				console.error('No Server Response')
				setLoading(false);
			} else {
				console.error(err)
			}
		}
	}

	return (
		<div className="lg:p-20 md:p-10 p-3">
			{loading && <Spinner />}
			<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mb-20 md:mt-0 my-8" onClick={() => navigate("/servicess")}>
				<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Services</p>
			</button>
			<div className="flex md:justify-start justify-center md:items-start items-center">
				<div className="md:flex-1">

					<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
						<div className="flex">
							<ClipboardCopyIcon className="md:w-14 w-8 md:ml-10 ml-3" />
							<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Add Service</h3>
						</div>
					</div>

					<form className="my-16 space-y-0" onSubmit={handleSubmit}>

						{/*Beneficiary*/}
						<div className="flex md:flex-row flex-col">

							<div>
								<label
									htmlFor="name"
									className="block text-md font-medium text-gray-500"
								>
									Service Name
									<span className="text-red-600">*</span>
								</label>
								<div className="mt-1">
									<input
										id="name"
										required
										aria-required="true"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 w-96"
									/>
								</div>
							</div>
						</div>

						{/*Service*/}
						<div className="flex md:pt-10 pt-5 md:flex-row flex-col">

							<div>
								<label
									htmlFor="category"
									className="block text-md font-medium text-gray-500"
								>
									Category
									<span className="text-red-600">*</span>
								</label>
								<div className="mt-1">
									<select
										id="category"
										required
										aria-required="true"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
										className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 w-96">
										<option value="">Select a service</option>
										<option value="primary">Primary</option>
										<option value="secondary">Secondary</option>
									</select>
								</div>
							</div>

						</div>

						<div className="flex justify-start">
							<button type="submit" className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg">
								Submit
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddService;