import React, {useState} from 'react';
import {Helmet, HelmetProvider} from "react-helmet-async";
import {ChevronLeftIcon, DocumentReportIcon} from "@heroicons/react/outline";
import {useNavigate, useParams} from "react-router-dom";
import storage from "../../../data/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const UploadReport = () => {
	const axiosPrivate = useAxiosPrivate();
	const appointment = useParams();
	const appointmentId = appointment.appointmentId;

	// const [loading, setLoading] = useState()
	const navigate = useNavigate();

	// State to store uploaded file
	const [file, setFile] = useState("");

	// progress
	const [percent, setPercent] = useState(0);

	// Handle file upload event and update state
	function handleChange(event) {
		setFile(event.target.files[0]);
	}

	const handleUpload = () => {
		if (!file) {
			alert("Please upload PDF report first!");
		}

		const storageRef = ref(storage, `/reports/${Math.floor(Date.now() / 1000) + "_" + file.name}`);

		// progress can be paused and resumed. It also exposes progress updates.
		// Receives the storage reference and the file to upload.
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);

				// update progress
				setPercent(percent);
			},
			(err) => console.log(err),
			() => {
				// download url
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					axiosPrivate.patch(`/admin/appointment/${appointmentId}`,
						JSON.stringify({
							reportUrl: url
						}),
						{
							headers: {
								'Content-Type': 'application/json',
							},
							withCredentials: true
						}
					).then(() => {
						setTimeout(navigate(-1), 3000)
					})
				});
			}

		);
	};

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>Upload Report | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<div className="lg:p-20 md:p-10 p-3">
					{/*{loading && <Spinner />}*/}
					<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mt-14 md:mb-4 mt-20 mb-4" onClick={() => navigate(-1)}>
						<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back</p>
					</button>
					<div className="flex md:justify-start justify-center md:items-start items-center">
						<div className="md:flex-1">

							<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
								<div className="flex">
									<DocumentReportIcon className="md:w-14 w-8 md:ml-10 ml-3" />
									<h3 className="md:text-3xl text-2xl py-8 md:px-8 px-2">Upload Report</h3>
								</div>
							</div>


								{/*Upload File*/}
								<div className="flex md:flex-row flex-col mt-10">

									<div>
										<label htmlFor="report" className="block text-md font-medium text-gray-500">Upload Report <span
											className="text-red-600">*</span></label>
										<div className="mt-1">
									<input
										type="file"
										accept="application/pdf"
										id="report"
										required
										placeholder="Select file"
										onChange={handleChange}
										className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 w-96"/>
										</div>
									</div>
								</div>

								<div className="flex justify-start items-center">
									<button onClick={handleUpload} className="px-4 py-3 my-10 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg">
										Upload
									</button>
								</div>
							{percent > 0 && <label htmlFor="report" className="block font-light text-ihs-green">Progress: {percent}% </label>}

						</div>
					</div>
				</div>
			</>
		</HelmetProvider>
	);
};

export default UploadReport;