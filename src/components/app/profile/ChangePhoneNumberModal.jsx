import React from 'react';
import {useFormik} from "formik";
import {changePhoneNumberSchema} from "../../../utils/formSchema";
import {axiosPrivate} from "../../../api/axios";

const UPDATE_USER = '/user/update';

const ChangePhoneNumberModal = ({existingPhoneNumber, setShowUpdatePhoneModal, setUpdatePhoneModalSuccess, updatePhoneModalSuccess}) => {

	const onSubmit = async (values, actions) => {
		const phone = values.phone

		await axiosPrivate.patch(UPDATE_USER,
			JSON.stringify({phone: phone}),
			{
				headers: {'Content-Type': 'application/json'},
				withCredentials: true
			}
		)
		.then(() => {
			setUpdatePhoneModalSuccess(true)
		});

		actions.resetForm();
	}

	const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			phone: existingPhoneNumber,
		},
		validationSchema: changePhoneNumberSchema,
		onSubmit,
	})

	// close modal and set operation success to false
	const handleCancelClick = () => {
		setShowUpdatePhoneModal(false);
		setUpdatePhoneModalSuccess(false);
	}

	return (
		<div className="bg-zinc-200 opacity-90 fixed inset-0 z-50   ">

			<div className="flex h-screen justify-center items-center">
				<div className="w-full md:w-1/3 mx-auto">
					<div className=" flex flex-col p-5 rounded-lg shadow bg-white">
						<div className="flex flex-col items-center text-center">
							<div className="inline-block p-4 bg-ihs-green-shade-50 rounded-full">
								{updatePhoneModalSuccess ?
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
									</svg>
									:
									<svg className="w-12 h-12 fill-current text-ihs-green" xmlns="http://www.w3.org/2000/svg"
											 viewBox="0 0 24 24">
										<path d="M0 0h24v24H0V0z" fill="none"/>
										<path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/>
									</svg>
								}
							</div>
							{updatePhoneModalSuccess ?
								<>
									<h2 className="mt-10 md:text-2xl font-semibold text-gray-800">Updated Successfully</h2>
								</>
								:
								<>
									<h2 className="mt-2 md:text-2xl font-semibold text-gray-800">Update Phone Number</h2>
									<p className="mt-2 md:text-md text-gray-600 leading-relaxed">Are you sure you want to change your
										phone number?</p>
								</>
							}
						</div>

						{updatePhoneModalSuccess ?

							<span className="flex items-center pt-10">
								<button
									className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
									onClick={handleCancelClick}>
									Done
								</button>
							</span>
							:
							<form className="my-5 space-y-0" onSubmit={handleSubmit}>
								<label htmlFor="phone-number" className="block text-sm font-medium text-gray-500 py-2">
									Phone Number <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.phone}
										onChange={handleChange}
										onBlur={handleBlur}
										type="tel" id="phone"
										placeholder='New Phone Number'
										className={` ${errors.phone && touched.phone ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.phone && touched.phone &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.phone}</p>}

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
										{isSubmitting ? "Updating" : "Update"}
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

export default ChangePhoneNumberModal;