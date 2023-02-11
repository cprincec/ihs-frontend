import React, {useState} from 'react';
import {axiosPrivate} from "../../../api/axios";
import {useFormik} from "formik";
import {addUserSchema} from "../../../utils/formSchema";
import {userRoles} from "../../../data/enums";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline";
import {ExclamationCircleIcon} from "@heroicons/react/solid";

const ADD_EMPLOYEE = '/user/addEmployee';
const ADD_ADMIN = '/user/addAdmin';

const AddUserModal = ({setAddUserModalSuccess, setShowAddUserModal, addUserModalSuccess}) => {

	const [revealPwd, setRevealPwd] = useState(false);
	const [errMsg, setErrMsg] = useState(false);

	const onSubmit = async (values, actions) => {
		const firstName = values.firstName;
		const lastName = values.lastName;
		const email = values.email;
		const phone = values.phone;
		const password = values.password;
		const role = values.role;
		const dob = values.dob;

		try {
			if (role === userRoles.Employee){
				await axiosPrivate.post(ADD_EMPLOYEE,
					JSON.stringify({ firstName, lastName, phone, email, password, role, dob }),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
					}
				).then(() => {
					setAddUserModalSuccess(true)
				});
			} else {
				await axiosPrivate.post(ADD_ADMIN,
					JSON.stringify({ firstName, lastName, phone, email, password, role, dob }),
					{
						headers: { 'Content-Type': 'application/json' },
						withCredentials: true
					}
				).then(() => {
					setAddUserModalSuccess(true)
				});
			}
		} catch (err) {
			if (!err.response) {
				setErrMsg('No Server Response');
			} else if (err.response.status === 500) {
				setErrMsg(err.response.data.message);
			} else {
				setErrMsg('Error Adding User');
			}
		}

		actions.resetForm();
	}

	const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			password: '',
			role: '',
			dob: '',
		},
		validationSchema: addUserSchema,
		onSubmit,
	})

	// close modal and set operation success to false
	const handleCancelClick = () => {
		setShowAddUserModal(false);
		setAddUserModalSuccess(false);
	}

	return (
		<div className="bg-zinc-200 opacity-90 fixed inset-0 z-50   ">

			<div className="flex h-screen justify-center items-center">
				<div className="w-full md:w-1/3 mx-auto">
					<div className=" flex flex-col p-5 rounded-lg shadow bg-white">
						<div className="flex flex-col items-center text-center">
							<div className="inline-block p-4 bg-ihs-green-shade-50 rounded-full">
								{addUserModalSuccess ?
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
									</svg>
									:
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
											 stroke="currentColor" className="w-12 h-12 text-ihs-green">
										<path strokeLinecap="round" strokeLinejoin="round"
													d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"/>
									</svg>

								}
							</div>
							{addUserModalSuccess ?
								<>
									<h2 className="mt-10 md:text-2xl font-semibold text-gray-800">User Created Successfully</h2>
								</>
								:
								<>
									<h2 className="mt-2 md:text-2xl font-semibold text-gray-800">Add Admin User</h2>
									<p className="mt-2 md:text-md text-gray-600 leading-relaxed"></p>
								</>
							}
						</div>

						{addUserModalSuccess ?

							<span className="flex items-center pt-10">
								<button
									className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
									onClick={handleCancelClick}>
									Done
								</button>
							</span>
							:

							<form className="my-5 space-y-0" onSubmit={handleSubmit}>

								{/*Error Message*/}
								<p
									className={errMsg ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm" : "absolute -left-[99999px]"}
									aria-live="assertive">
									<span className="flex items-center">
										<ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline"/>
										{errMsg}
									</span>
								</p>

								{/*First Name*/}
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


								{/*Last Name*/}
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

								{/*Email*/}
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

								{/*Phone Number*/}
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

								{/*Password*/}
								<label htmlFor="password" className="block text-sm font-medium text-gray-500 py-2">
									Password <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
										type= {revealPwd ? "text" : "password"}
										id="password"
										placeholder='Password'
										className={` ${errors.password && touched.password? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`} />

									{revealPwd ?
										<EyeOffIcon className="w-4 -ml-6 text-gray-500" onClick={() => setRevealPwd(prevState => !prevState) }/>
										:
										<EyeIcon className="w-4 -ml-6 text-gray-500" onClick={() => setRevealPwd(prevState => !prevState) } />
									}
								</span>
								{errors.password && touched.password &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.password}</p>}

								{/*Role*/}
								<label htmlFor="role" className="block text-sm font-medium text-gray-500 py-2">
									Role <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<select
										value={values.role}
										onChange={handleChange}
										onBlur={handleBlur}
										id="role"
										required
										aria-required="true"
										className={` ${errors.role && touched.role ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}>
										<option value="">Select a Role</option>
										<option value={userRoles.Employee}>Employee</option>
										<option value={userRoles.Admin}>Admin</option>
									</select>
								</span>
								{errors.role && touched.role &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.role}</p>}

								{/*Date of Birth*/}
								<label htmlFor="dob" className="block text-sm font-medium text-gray-500 py-2">
									Date of Birth <span className="text-red-600">*</span>
								</label>

								<span className="flex items-center">
									<input
										value={values.dob}
										onChange={handleChange}
										onBlur={handleBlur}
										type="date" id="dob"
										placeholder='Date of Birth'
										className={` ${errors.dob && touched.dob ? 'focus:ring-red-600' : 'focus:ring-ihs-green-shade-600'} 
										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}/>
								</span>
								{errors.dob && touched.dob &&
									<p className="text-red-500 normal-case text-xs pt-2">{errors.dob}</p>}

								{/*Buttons*/}
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

export default AddUserModal;