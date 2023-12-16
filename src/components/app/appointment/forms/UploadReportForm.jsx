import { Form, Formik } from "formik";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ClipboardCheckIcon } from "@heroicons/react/outline";
import usePatch from "../../../../hooks/usePatch";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import storage from "../../../../data/firebaseConfig";
import { useParams } from "react-router-dom";

const UploadReportForm = ({ handleCancelClick, setFormSuccess }) => {
    const initialValues = { file: null };
    const params = useParams();
    const appointmentId = params.appointmentId;
    const queryClient = useQueryClient();

    const uploadReportMutation = usePatch();
    const [errMsg, setErrMsg] = useState(false);

    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    const handleUpload = () => {
        console.log(file);
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
                const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

                // update progress
                setPercent(percent);
            },
            (err) => setErrMsg(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    uploadReportMutation.mutate(
                        {
                            url: `/admin/appointment/${appointmentId}`,
                            body: { reportUrl: url },
                        },
                        {
                            onError: (error) => {
                                console.log(error);
                                setErrMsg("Something went wrong");
                            },
                            onSuccess: () => {
                                queryClient.invalidateQueries([`appointment, ${appointmentId}`]);
                                queryClient.invalidateQueries(["appointments"]);
                                queryClient.invalidateQueries(["allAppointments"]);
                                setFormSuccess(true);
                            },
                        }
                    );
                });
            }
        );
    };

    return (
        <div>
            <div className="flex gap-x-2 items-center justify-between">
                <div className="flex items-center gap-x-1">
                    <ClipboardCheckIcon className="w-8 text-ihs-green" />
                    <h2 className="md:text-xl font-semibold text-gray-800">Upload report</h2>
                </div>
                <span
                    className="mr-4 font-bold cursor-pointer text-xl text-[red] hover:text-ihs-green transition-all"
                    onClick={() => handleCancelClick()}
                >
                    ⨉
                </span>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleUpload}>
                {() => (
                    <Form className="grid gap-y-6">
                        <div className="grid gap-x-6 gap-y-3 mt-8 items-start">
                            <div className="grid transition">
                                <label htmlFor="file">
                                    Upload Report<span className="text-red-600">*</span>
                                </label>

                                <div className="mt-1">
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        id="report"
                                        required
                                        placeholder="Select file"
                                        onChange={handleChange}
                                        className="w-full text-black border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600"
                                    />
                                </div>
                            </div>
                            {percent > 0 && (
                                <label htmlFor="report" className="block font-light text-ihs-green">
                                    Progress: {percent}%{" "}
                                </label>
                            )}
                        </div>
                        <div className="flex mt-2 gap-x-4">
                            <button
                                className="transition flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-ihs-green md:text-base text-sm font-medium rounded-md"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="transition disabled:bg-ihs-green-shade-200 disabled:text-slate-600 disabled:border-slate-200 disabled:shadow-none flex-1 px-4 py-2 ml-2 text-white md:text-base text-sm font-medium rounded-md bg-ihs-green"
                                disabled={uploadReportMutation.isLoading}
                            >
                                {uploadReportMutation.isLoading ? "Please wait..." : "Upload Report"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UploadReportForm;
