// import React, { useEffect, useState } from "react";
// import { ChevronLeftIcon, ClipboardCopyIcon } from "@heroicons/react/outline";
// import { useNavigate, useParams } from "react-router-dom";
// import { Helmet, HelmetProvider } from "react-helmet-async";
// import { appointmentStatus } from "../../../data/enums";
// import TopBarProgress from "react-topbar-progress-indicator";
// import { capitalizeString } from "../../../utils/capitalizeString";
// import useFetch from "../../../hooks/useFetch";
// import { useSelector } from "react-redux";
// import { userRoles } from "../../../data/enums";
// import Shimmer from "../Shimmer";
// import usePatch from "../../../hooks/usePatch";
// import { useQueryClient } from "@tanstack/react-query";
// import { ExclamationCircleIcon } from "@heroicons/react/solid";
// import { getKey } from "../../../utils/mobilePreferences";
// import formatDate from "../../../utils/dateToString";

// TopBarProgress.config({
//     barColors: {
//         0: "#05afb0",
//     },
//     shadowBlur: 5,
// });

// const AssignHealthWorker = () => {
//     const appointmentId = useParams().appointmentId;
//     const navigate = useNavigate();

//     const [mobileAuth, setMobileAuth] = useState("");
//     const [errMsg, setErrMsg] = useState(false);

//     const userType = useSelector((state) => state.auth.userAccess.userType);

//     const fetchHealthWorkers = useFetch("/worker/all", "healthWorkers");
//     const fetchAppointment = useFetch(
//         `${
//             (mobileAuth?.userType || userType) === userRoles.User
//                 ? `/user/appointments/${appointmentId}`
//                 : `/admin/appointment/${appointmentId}`
//         }`,
//         `appointment, ${appointmentId}`
//     );
//     const assignHealthWorkerMutation = usePatch();
//     const queryClient = useQueryClient();

//     // get auth mobile preferences
//     useEffect(() => {
//         getKey("auth")
//             .then((result) => {
//                 setMobileAuth(result);
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }, []);

//     const handleUpdate = (e) => {
//         e.preventDefault();

//         const healthWorkerId = e.target.healthWorker.value;

//         const filteredHealthWorker = fetchHealthWorkers.data.filter(
//             (healthWorker) => healthWorker.id === healthWorkerId
//         );
//         const healthWorkerName =
//             capitalizeString(filteredHealthWorker[0].firstName) +
//             " " +
//             capitalizeString(filteredHealthWorker[0].lastName);

//         assignHealthWorkerMutation.mutate(
//             {
//                 url: `/admin/appointment/${appointmentId}`,
//                 body: {
//                     healthWorkerId,
//                     healthWorkerName,
//                     status: appointmentStatus.Confirmed,
//                 },
//             },
//             {
//                 onError: (error) => {
//                     setErrMsg(error.message);
//                 },
//                 onSuccess: () => {
//                     queryClient.invalidateQueries(["allAppointments"]);
//                     queryClient.invalidateQueries(["appointments"]);
//                     queryClient.invalidateQueries([
//                         `appointment, ${appointmentId}`,
//                     ]);
//                     navigate("/allappointments");
//                 },
//             }
//         );
//     };

//     return (
//         <HelmetProvider>
//             <>
//                 <Helmet>
//                     <title>Assign Health Worker | IHS Dashboard</title>
//                     <link rel="canonical" href="https://www.ihsmdinc.com/" />
//                 </Helmet>
//                 <div className="lg:px-20 lg:py-4 md:px-10 p-3">
//                     <p
//                         className={
//                             errMsg
//                                 ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
//                                 : "absolute -left-[99999px]"
//                         }
//                         aria-live="assertive"
//                     >
//                         <span className="flex items-center">
//                             <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
//                             {errMsg}
//                         </span>
//                     </p>
//                     {(fetchHealthWorkers.isLoading ||
//                         fetchAppointment.isLoading ||
//                         assignHealthWorkerMutation.isLoading) && (
//                         <TopBarProgress />
//                     )}
//                     <button
//                         className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
//                         onClick={() => navigate(-1)}
//                     >
//                         <ChevronLeftIcon className="w-6" />{" "}
//                         <p className="text-lg px-5">Back</p>
//                     </button>

//                     <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
//                         <div className="flex">
//                             <ClipboardCopyIcon className="md:w-12 w-8 md:ml-10 ml-3" />
//                             <h3 className="md:text-2xl text-lg py-8 md:px-8 px-2">
//                                 Assign Health Worker
//                             </h3>
//                         </div>
//                     </div>

//                     <form className="my-16 space-y-0" onSubmit={handleUpdate}>
//                         {/*Beneficiary*/}
//                         <div className="flex md:flex-row flex-col">
//                             <div>
//                                 <label
//                                     htmlFor="beneficiary"
//                                     className="block text-md font-medium text-gray-500"
//                                 >
//                                     Beneficiary
//                                     <span className="text-red-600">*</span>
//                                 </label>
//                                 {fetchAppointment.isLoading ? (
//                                     <Shimmer />
//                                 ) : (
//                                     <div className="mt-1">
//                                         <input
//                                             type="text"
//                                             id="beneficiaryName"
//                                             name="beneficiaryName"
//                                             disabled
//                                             aria-required="true"
//                                             defaultValue={
//                                                 fetchAppointment?.data[0]
//                                                     ?.beneficiaryName
//                                             }
//                                             className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/*Service*/}
//                         <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
//                             <div>
//                                 <label
//                                     htmlFor="service"
//                                     className="block text-md font-medium text-gray-500"
//                                 >
//                                     Service
//                                     <span className="text-red-600">*</span>
//                                 </label>
//                                 {fetchAppointment.isLoading ? (
//                                     <Shimmer />
//                                 ) : (
//                                     <div className="mt-1">
//                                         <input
//                                             id="service"
//                                             name="service"
//                                             disabled
//                                             aria-required="true"
//                                             defaultValue={
//                                                 fetchAppointment?.data[0]
//                                                     .serviceName
//                                             }
//                                             className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 lg:w-96 md:w-72"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/*Health Worker*/}
//                         <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
//                             <div>
//                                 <label
//                                     htmlFor="healthWorker"
//                                     className="block text-md font-medium text-gray-500"
//                                 >
//                                     Health Worker
//                                     <span className="text-red-600">*</span>
//                                 </label>
//                                 {fetchAppointment.isLoading ||
//                                 fetchHealthWorkers.isLoading ? (
//                                     <Shimmer />
//                                 ) : (
//                                     <div className="mt-1">
//                                         <select
//                                             id="healthWorker"
//                                             name="healthWorker"
//                                             required
//                                             defaultValue={
//                                                 fetchAppointment?.data[0]
//                                                     ?.healthWorkerId
//                                             }
//                                             aria-required="true"
//                                             className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 lg:w-96 md:w-72"
//                                         >
//                                             <option value="">
//                                                 Select a Health Worker
//                                             </option>
//                                             {fetchHealthWorkers?.data
//                                                 ?.length ? (
//                                                 fetchHealthWorkers?.data?.map(
//                                                     (healthWorker, index) => (
//                                                         <option
//                                                             key={index}
//                                                             value={
//                                                                 healthWorker?.id
//                                                             }
//                                                         >
//                                                             {capitalizeString(
//                                                                 healthWorker?.firstName
//                                                             )}{" "}
//                                                             {capitalizeString(
//                                                                 healthWorker?.lastName
//                                                             )}
//                                                         </option>
//                                                     )
//                                                 )
//                                             ) : (
//                                                 <option value="">
//                                                     No health workers at this
//                                                     time
//                                                 </option>
//                                             )}
//                                         </select>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/*Date and Time*/}
//                         <div className="flex md:flex-wrap md:flex-row flex-col md:pt-10 pt-5 ">
//                             <div>
//                                 <label
//                                     htmlFor="date"
//                                     className="block text-md font-medium text-gray-500"
//                                 >
//                                     Date
//                                     <span className="text-red-600">*</span>
//                                 </label>
//                                 {fetchAppointment.isLoading ? (
//                                     <Shimmer />
//                                 ) : (
//                                     <div className="mt-1">
//                                         <input
//                                             type="date"
//                                             id="date"
//                                             name="date"
//                                             disabled
//                                             autoComplete="current-date"
//                                             aria-required="true"
//                                             defaultValue={formatDate(
//                                                 fetchAppointment?.data[0]?.date
//                                             )}
//                                             className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
//                                         />
//                                     </div>
//                                 )}
//                             </div>

//                             <div className="lg:ml-10 lg:mt-0 md:mt-0 md:ml-10 mt-5">
//                                 <label
//                                     htmlFor="time"
//                                     className="block text-md font-medium text-gray-500"
//                                 >
//                                     Time
//                                     <span className="text-red-600">*</span>
//                                 </label>
//                                 {fetchAppointment.isLoading ? (
//                                     <Shimmer />
//                                 ) : (
//                                     <div className="mt-1">
//                                         <input
//                                             id="time"
//                                             name="time"
//                                             disabled
//                                             autoComplete="current-time"
//                                             aria-required="true"
//                                             defaultValue={
//                                                 fetchAppointment?.data[0]?.time
//                                             }
//                                             className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                         <div className="flex justify-start">
//                             <button
//                                 type="submit"
//                                 className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
//                             >
//                                 Update
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </>
//         </HelmetProvider>
//     );
// };

// export default AssignHealthWorker;
