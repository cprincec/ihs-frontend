import React from 'react';
import {axiosPrivate} from "../../../api/axios";
import {useFormik} from "formik";
import {addServiceSchema} from "../../../utils/formSchema";

const ADD_SERVICE = "/admin/service/create"

const AddServiceModal = ({setAddServiceModalSuccess, setShowAddServiceModal, addServiceModalSuccess}) => {

	const onSubmit = async (values, actions) => {
		const name = values.name;
		const category = values.category;

		await axiosPrivate.post(ADD_SERVICE,
			JSON.stringify({
				name, category}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true
			}
		)
		.then(() => {
			setAddServiceModalSuccess(true)
		});

		actions.resetForm();
	}

	const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			name: '',
			category: ''
		},
		validationSchema: addServiceSchema,
		onSubmit,
	})

	// close modal and set operation success to false
	const handleCancelClick = () => {
		setShowAddServiceModal(false);
		setAddServiceModalSuccess(false);
	}

	return (
		<div className="bg-zinc-200 opacity-90 fixed inset-0 z-50   ">

			<div className="flex h-screen justify-center items-center">
				<div className="w-full md:w-1/3 mx-auto">
					<div className=" flex flex-col p-5 rounded-lg shadow bg-white">
						<div className="flex flex-col items-center text-center">
							<div className="inline-block p-4 bg-ihs-green-shade-50 rounded-full">
								{addServiceModalSuccess ?
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
									</svg>
									:
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round"
													d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
									</svg>
								}
							</div>
							{addServiceModalSuccess ?
								<>
									<h2 className="mt-10 md:text-2xl font-semibold text-gray-800">Service Created Successfully</h2>
								</>
								:
								<>
									<h2 className="mt-2 md:text-2xl font-semibold text-gray-800">Add New Service</h2>
									<p className="mt-2 md:text-md text-gray-600 leading-relaxed"></p>
								</>
							}
						</div>

						{addServiceModalSuccess ?

							<span className="flex items-center pt-10">
								<button
									className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
									onClick={handleCancelClick}>
									Done
								</button>
							</span>
							:
							<form className="my-5 space-y-0" onSubmit={handleSubmit}>
								<label htmlFor="name" className="block text-sm font-medium text-gray-500 py-2">
									Service Name <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.name}
										onChange={handleChange}
										onBlur={handleBlur}
										type="text" id="name"
										placeholder='Service Name'
										className={` ${errors.name && touched.name ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.name && touched.name &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.name}</p>}

								<label htmlFor="category" className="block text-sm font-medium text-gray-500 py-2">
									Category <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<select
										value={values.category}
										onChange={handleChange}
										onBlur={handleBlur}
										id="category"
										required
										aria-required="true"
										className={` ${errors.category && touched.category ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}>
										<option value="">Select a service</option>
										<option value="primary">Primary</option>
										<option value="secondary">Secondary</option>
									</select>
								</span>
								{errors.category && touched.category &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.category}</p>}

								<span className="flex items-center py-5">
									<button
										className="flex-1 px-4 py-2 bg-gray-100 text-ihs-green md:text-lg text-sm font-medium rounded-md"
										onClick={handleCancelClick}>
										Cancel
									</button>

									<button
										type="submit"
										disabled={Object.keys(errors).length > 0 || isSubmitting}
										className="disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green">
										{isSubmitting ? "Submitting" : "Submit"}
									</button>
								</span>
							</form>

						}

					</div>
				</div>
			</div>
		</div>
	);
};

export default AddServiceModal;