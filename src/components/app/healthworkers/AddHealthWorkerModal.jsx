// // import React from "react";
// // import { useFormik } from "formik";
// // import { addHealthWorkerSchema } from "../../../utils/formSchema";
// // import usePost from "../../../hooks/usePost";

// // const AddHealthWorkerModal = ({
// //   setAddHealthWorkerModalSuccess,
// //   setShowAddHealthWorkerModal,
// //   addHealthWorkerModalSuccess,
// //   refetch,
// // }) => {
// //   const addHealthWorkerMutation = usePost();

// //   const onSubmit = async (values, actions) => {
// //     let healthWorkerData = {};
// //     for (const key in values) {
// //       healthWorkerData[key] = values[key];
// //     }

// //     addHealthWorkerMutation.mutate(
// //       {
// //         url: "/worker/create",
// //         body: healthWorkerData,
// //       },
// //       {
// //         onSuccess: () => {
// //           setAddHealthWorkerModalSuccess(true);
// //           actions.resetForm();
// //           refetch();
// //         },
// //       }
// //     );
// //   };

// //   const {
// //     values,
// //     errors,
// //     touched,
// //     isSubmitting,
// //     handleChange,
// //     handleBlur,
// //     handleSubmit,
// //   } = useFormik({
// //     initialValues: {
// //       firstName: "",
// //       lastName: "",
// //       email: "",
// //       phone: "",
// //       qualification: "",
// //     },
// //     validationSchema: addHealthWorkerSchema,
// //     onSubmit,
// //   });

// //   // close modal and set operation success to false
// //   const handleCancelClick = () => {
// //     setShowAddHealthWorkerModal(false);
// //     setAddHealthWorkerModalSuccess(false);
// //   };

// //   return (
// //     <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
// //       <div className="flex h-screen justify-center items-center">
// //         <div className="w-full md:w-1/3 mx-auto">
// //           <div className=" flex flex-col p-5 rounded-lg shadow bg-white">
// //             <div className="flex flex-col items-center text-center">
// //               <div className="inline-block p-4 bg-ihs-green-shade-50 rounded-full">
// //                 {addHealthWorkerModalSuccess ? (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     strokeWidth="1.5"
// //                     stroke="currentColor"
// //                     className="w-12 h-12 text-ihs-green"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       d="M4.5 12.75l6 6 9-13.5"
// //                     />
// //                   </svg>
// //                 ) : (
// //                   <svg
// //                     xmlns="http://www.w3.org/2000/svg"
// //                     fill="none"
// //                     viewBox="0 0 24 24"
// //                     strokeWidth="1.5"
// //                     stroke="currentColor"
// //                     className="w-12 h-12 text-ihs-green"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
// //                     />
// //                   </svg>
// //                 )}
// //               </div>
// //               {addHealthWorkerModalSuccess ? (
// //                 <>
// //                   <h2 className="mt-10 md:text-2xl font-semibold text-gray-800">
// //                     Health Worker Created Successfully
// //                   </h2>
// //                 </>
// //               ) : (
// //                 <>
// //                   <h2 className="mt-2 md:text-2xl font-semibold text-gray-800">
// //                     Add Health Worker
// //                   </h2>
// //                   <p className="mt-2 md:text-md text-gray-600 leading-relaxed"></p>
// //                 </>
// //               )}
// //             </div>

// //             {addHealthWorkerModalSuccess ? (
// //               <span className="flex items-center pt-10">
// //                 <button
// //                   className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
// //                   onClick={handleCancelClick}
// //                 >
// //                   Done
// //                 </button>
// //               </span>
// //             ) : (
// //               <form className="my-5 space-y-0" onSubmit={handleSubmit}>
// //                 <label
// //                   htmlFor="firstName"
// //                   className="block text-sm font-medium text-gray-500 py-2"
// //                 >
// //                   First Name <span className="text-red-600">*</span>
// //                 </label>

// //                 <span className="flex items-center">
// //                   <input
// //                     value={values.firstName}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     type="text"
// //                     id="firstName"
// //                     placeholder="John"
// //                     className={` ${
// //                       errors.firstName && touched.firstName
// //                         ? "focus:ring-red-600"
// //                         : "focus:ring-ihs-green-shade-600"
// //                     }
// // 										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
// //                   />
// //                 </span>
// //                 {errors.firstName && touched.firstName && (
// //                   <p className="text-red-500 normal-case text-xs pt-2">
// //                     {errors.firstName}
// //                   </p>
// //                 )}

// //                 <label
// //                   htmlFor="lastName"
// //                   className="block text-sm font-medium text-gray-500 py-2"
// //                 >
// //                   Last Name <span className="text-red-600">*</span>
// //                 </label>

// //                 <span className="flex items-center">
// //                   <input
// //                     value={values.lastName}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     type="text"
// //                     id="lastName"
// //                     placeholder="Doe"
// //                     className={` ${
// //                       errors.lastName && touched.lastName
// //                         ? "focus:ring-red-600"
// //                         : "focus:ring-ihs-green-shade-600"
// //                     }
// // 										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
// //                   />
// //                 </span>
// //                 {errors.lastName && touched.lastName && (
// //                   <p className="text-red-500 normal-case text-xs pt-2">
// //                     {errors.lastName}
// //                   </p>
// //                 )}

// //                 <label
// //                   htmlFor="email"
// //                   className="block text-sm font-medium text-gray-500 py-2"
// //                 >
// //                   Email <span className="text-red-600">*</span>
// //                 </label>

// //                 <span className="flex items-center">
// //                   <input
// //                     value={values.email}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     type="email"
// //                     id="email"
// //                     placeholder="johndoe@email.com"
// //                     className={` ${
// //                       errors.email && touched.email
// //                         ? "focus:ring-red-600"
// //                         : "focus:ring-ihs-green-shade-600"
// //                     }
// // 										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
// //                   />
// //                 </span>
// //                 {errors.email && touched.email && (
// //                   <p className="text-red-500 normal-case text-xs pt-2">
// //                     {errors.email}
// //                   </p>
// //                 )}

// //                 <label
// //                   htmlFor="phone"
// //                   className="block text-sm font-medium text-gray-500 py-2"
// //                 >
// //                   Phone Number <span className="text-red-600">*</span>
// //                 </label>

// //                 <span className="flex items-center">
// //                   <input
// //                     value={values.phone}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     type="tel"
// //                     id="phone"
// //                     placeholder="Phone Number"
// //                     className={` ${
// //                       errors.phone && touched.phone
// //                         ? "focus:ring-red-600"
// //                         : "focus:ring-ihs-green-shade-600"
// //                     }
// // 										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
// //                   />
// //                 </span>
// //                 {errors.phone && touched.phone && (
// //                   <p className="text-red-500 normal-case text-xs pt-2">
// //                     {errors.phone}
// //                   </p>
// //                 )}

// //                 <label
// //                   htmlFor="qualification"
// //                   className="block text-sm font-medium text-gray-500 py-2"
// //                 >
// //                   Qualification <span className="text-red-600">*</span>
// //                 </label>

// //                 <span className="flex items-center">
// //                   <input
// //                     value={values.qualification}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     type="text"
// //                     id="qualification"
// //                     placeholder="Doctor"
// //                     className={` ${
// //                       errors.qualification && touched.qualification
// //                         ? "focus:ring-red-600"
// //                         : "focus:ring-ihs-green-shade-600"
// //                     }
// // 										w-full border border-gray-300 px-3 py-3 text-gray-500 rounded-md focus:outline-none focus:ring-1`}
// //                   />
// //                 </span>
// //                 {errors.qualification && touched.qualification && (
// //                   <p className="text-red-500 normal-case text-xs pt-2">
// //                     {errors.qualification}
// //                   </p>
// //                 )}

// //                 <span className="flex items-center py-5">
// //                   <button
// //                     className="flex-1 px-4 py-2 bg-gray-100 text-ihs-green md:text-lg text-sm font-medium rounded-md"
// //                     onClick={handleCancelClick}
// //                   >
// //                     Cancel
// //                   </button>

// //                   <button
// //                     type="submit"
// //                     disabled={Object.keys(errors).length > 0 || isSubmitting}
// //                     className="disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
// //                   >
// //                     {isSubmitting ? "Submitting" : "Submit"}
// //                   </button>
// //                 </span>
// //               </form>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddHealthWorkerModal;

// import { addHealthWorkerSchema } from "../../../utils/formSchema";
// import usePost from "../../../hooks/usePost";
// import BaseForm from "../form/BaseForm";
// import { Fragment, useState } from "react";
// import { Dialog, Transition } from "@headlessui/react";
// import { ErrorMessage, Field, Form, Formik } from "formik";

// const AddHealthWorkerModal = ({ setShowAddHealthWorkerModal, refetch }) => {
//     // indicate when form in this modal is successful
//     const [addHealthWorkerModalSuccess, setAddHealthWorkerModalSuccess] = useState(false);

//     const addHealthWorkerMutation = usePost();

//     const handleSubmit = async (values, actions) => {
//         let healthWorkerData = {};
//         for (const key in values) {
//             healthWorkerData[key] = values[key];
//         }

//         addHealthWorkerMutation.mutate(
//             {
//                 url: "/worker/create",
//                 body: healthWorkerData,
//             },
//             {
//                 onSuccess: () => {
//                     setAddHealthWorkerModalSuccess(true);
//                     actions.resetForm();
//                     refetch();
//                 },
//             }
//         );
//     };

//     // close modal and set operation success to false
//     const handleCancelClick = () => {
//         setShowAddHealthWorkerModal(false);
//         setAddHealthWorkerModalSuccess(false);
//     };

//     const initialValues = { firstName: "", lastName: "", email: "", phone: "", qualification: "" };

//     const initialValuesMetaData = [
//         {
//             key: "firstName",
//             fieldTitle: "Firstname",
//             placeHolder: "John",
//         },
//         {
//             key: "lastName",
//             fieldTitle: "Lastname",
//             placeHolder: "Doe",
//         },
//         {
//             key: "email",
//             fieldTitle: "Email",
//             placeHolder: "example@gmail.com",
//         },
//         {
//             key: "phone",
//             fieldTitle: "Phone",
//             placeHolder: "Phone Number",
//         },
//         {
//             key: "qualification",
//             fieldTitle: "Qualification",
//             placeHolder: "Doctor",
//             type: "select",
//         },
//     ];

//     return addHealthWorkerModalSuccess ? (
//         <div className="grid gap-y-4 sm:gap-y-6 py-4 px-6 items-center justify-items-center overflow-y-auto m-auto bg-white shadow rounded-lg">
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-12 h-12 text-ihs-green"
//             >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//             </svg>
//             <h2 className="md:text-xl font-semibold text-gray-800 mt-[-.5rem]">
//                 Health Worker Added Successfully"
//             </h2>

//             <button
//                 className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
//                 onClick={handleCancelClick}
//             >
//                 Done
//             </button>
//         </div>
//     ) : (
//         <Transition.Root show={setShowAddHealthWorkerModal} as={Fragment}>
//             <Dialog as="div" className="relative z-10" onClose={() => {}}>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
//                     leave="ease-in duration-200"
//                     leaveFrom="bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 overflow-y-auto">
//                     <div className="flex min-h-full items-center justify-center">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-6 py-8 shadow-xl transition-all w-full h-full sm:h-auto sm:max-h-[80%] sm:max-w-[60%] lg:max-w-[35%]">
//                                 <div>
//                                     <div className="flex gap-x-2 items-center justify-center justify-items-center">
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             strokeWidth="1.5"
//                                             stroke="currentColor"
//                                             className="w-12 h-12 text-ihs-green self-center"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
//                                             />
//                                         </svg>
//                                         <h2 className="md:text-xl font-semibold text-gray-800">
//                                             Add Service
//                                         </h2>
//                                     </div>
//                                     <Formik
//                                         initialValues={initialValues}
//                                         validationSchema={addHealthWorkerSchema}
//                                         onSubmit={handleSubmit}
//                                     >
//                                         {({ errors }) => (
//                                             <Form className="grid gap-y-3 mt-8">
//                                                 <div className="grid transition">
//                                                     <label htmlFor="name">
//                                                         Service Name
//                                                         <span className=" transition text-red-600">*</span>
//                                                     </label>

//                                                     <Field
//                                                         autoFocus={true}
//                                                         type="text"
//                                                         name="name"
//                                                         id="name"
//                                                         autoComplete="true"
//                                                         placeholder="Service name"
//                                                         className="transition border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
//                                                     />
//                                                     <ErrorMessage
//                                                         name="name"
//                                                         component="div"
//                                                         className={`${
//                                                             errors.name
//                                                                 ? "animate-fly-in-y"
//                                                                 : "animate-fly-out-y"
//                                                         } text-red-500 text-xs mt-1 transition-all duration-500`}
//                                                     />
//                                                 </div>

//                                                 <div className="grid transition">
//                                                     <label htmlFor="category">
//                                                         Category
//                                                         <span className="transition text-red-600">*</span>
//                                                     </label>

//                                                     <Field
//                                                         as="select"
//                                                         name="category"
//                                                         id="category"
//                                                         className="border border-gray-300 p-2 text-gray-500 rounded-md focus:outline-none focus:ring-1"
//                                                     >
//                                                         <option disabled={true} value="">
//                                                             Select a service
//                                                         </option>
//                                                         <option value="primary">Primary</option>
//                                                         <option value="secondary">Secondary</option>
//                                                     </Field>
//                                                     <ErrorMessage
//                                                         name="category"
//                                                         component="p"
//                                                         className={`${
//                                                             errors.category
//                                                                 ? "animate-fly-in-y"
//                                                                 : "animate-fly-out-y"
//                                                         } text-red-500 text-xs mt-1 transition-all duration-500`}
//                                                     />
//                                                 </div>

//                                                 <div className="flex mt-2">
//                                                     <button
//                                                         className="transition flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ihs-green md:text-base text-sm font-medium rounded-md"
//                                                         onClick={handleCancelClick}
//                                                     >
//                                                         Cancel
//                                                     </button>
//                                                     <button
//                                                         type="submit"
//                                                         className="transition disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-base text-sm font-medium rounded-md bg-ihs-green"
//                                                     >
//                                                         {addHealthWorkerMutation.isLoading
//                                                             ? "Please wait..."
//                                                             : "Submit"}
//                                                     </button>
//                                                 </div>
//                                             </Form>
//                                         )}
//                                     </Formik>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     );
//     // <BaseForm
//     //     metaData={initialValuesMetaData}
//     //     initialValues={initialValues}
//     //     onSubmit={onSubmit}
//     //     schema={addHealthWorkerSchema}
//     //     handleCancelClick={handleCancelClick}
//     //     formSuccess={formSuccess}
//     //     successMessage={"Health Worker Created Successfully"}
//     //     formTitle={"Add Health Worker"}
//     // />
// };

// export default AddHealthWorkerModal;
