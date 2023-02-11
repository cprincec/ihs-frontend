import React from 'react';
import {axiosPrivate} from "../../../api/axios";
import {useFormik} from "formik";
import {addHealthWorkerSchema} from "../../../utils/formSchema";

const ADD_HEALTH_WORKER = "/worker/create";

const AddHealthWorkerModal = ({setAddHealthWorkerModalSuccess, setShowAddHealthWorkerModal, addHealthWorkerModalSuccess}) => {

	const onSubmit = async (values, actions) => {
		const firstName = values.firstName;
		const lastName = values.lastName;
		const email = values.email;
		const phone = values.phone;
		const qualification = values.qualification;

		await axiosPrivate.post(ADD_HEALTH_WORKER,
			JSON.stringify({
				firstName, lastName, email, phone, qualification}),
			{
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true
			}
		)
		.then(() => {
			setAddHealthWorkerModalSuccess(true)
		});

		actions.resetForm();
	}

	const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			qualification: '',
		},
		validationSchema: addHealthWorkerSchema,
		onSubmit,
	})

	// close modal and set operation success to false
	const handleCancelClick = () => {
		setShowAddHealthWorkerModal(false);
		setAddHealthWorkerModalSuccess(false);
	}

	return (
		<div className="bg-zinc-200 opacity-90 fixed inset-0 z-50   ">

			<div className="flex h-screen justify-center items-center">
				<div className="w-full md:w-1/3 mx-auto">
					<div className=" flex flex-col p-5 rounded-lg shadow bg-white">
						<div className="flex flex-col items-center text-center">
							<div className="inline-block p-4 bg-ihs-green-shade-50 rounded-full">
								{addHealthWorkerModalSuccess ?
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
									</svg>
									:
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round"
													d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"/>
									</svg>

								}
							</div>
							{addHealthWorkerModalSuccess ?
								<>
									<h2 className="mt-10 md:text-2xl font-semibold text-gray-800">Health Worker Created Successfully</h2>
								</>
								:
								<>
									<h2 className="mt-2 md:text-2xl font-semibold text-gray-800">Add Health Worker</h2>
									<p className="mt-2 md:text-md text-gray-600 leading-relaxed"></p>
								</>
							}
						</div>

						{addHealthWorkerModalSuccess ?

							<span className="flex items-center pt-10">
								<button
									className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
									onClick={handleCancelClick}>
									Done
								</button>
							</span>
							:
							<form className="my-5 space-y-0" onSubmit={handleSubmit}>
								<label htmlFor="firstName" className="block text-sm font-medium text-gray-500 py-2">
									First Name <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.firstName}
										onChange={handleChange}
										onBlur={handleBlur}
										type="text" id="firstName"
										placeholder='John'
										className={` ${errors.firstName && touched.firstName ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.firstName && touched.firstName &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.firstName}</p>}

								<label htmlFor="lastName" className="block text-sm font-medium text-gray-500 py-2">
									Last Name <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.lastName}
										onChange={handleChange}
										onBlur={handleBlur}
										type="text" id="lastName"
										placeholder='Doe'
										className={` ${errors.lastName && touched.lastName ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.lastName && touched.lastName &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.lastName}</p>}

								<label htmlFor="email" className="block text-sm font-medium text-gray-500 py-2">
									Email <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.email}
										onChange={handleChange}
										onBlur={handleBlur}
										type="email" id="email"
										placeholder='johndoe@email.com'
										className={` ${errors.email && touched.email ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.email && touched.email &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.email}</p>}

								<label htmlFor="phone" className="block text-sm font-medium text-gray-500 py-2">
									Phone Number <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.phone}
										onChange={handleChange}
										onBlur={handleBlur}
										type="tel" id="phone"
										placeholder='Phone Number'
										className={` ${errors.phone && touched.phone ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.phone && touched.phone &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.phone}</p>}

								<label htmlFor="qualification" className="block text-sm font-medium text-gray-500 py-2">
									Qualification <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.qualification}
										onChange={handleChange}
										onBlur={handleBlur}
										type="text" id="qualification"
										placeholder='Doctor'
										className={` ${errors.qualification && touched.qualification ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.qualification && touched.qualification &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.qualification}</p>}

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

export default AddHealthWorkerModal;