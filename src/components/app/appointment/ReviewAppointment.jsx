import React, { useState } from "react";
import {
  AnnotationIcon,
  ChevronLeftIcon,
} from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import usePatch from "../../../hooks/usePatch";
import { useQueryClient } from "@tanstack/react-query";

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const ReviewAppointment = () => {
  const [errMsg, setErrMsg] = useState(false);

  const reviewAppointmentMutation = usePatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const params = useParams();
  const appointmentId = params.appointmentId;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData(e.target);
    const reviewAppointmentData = {};
    for (const [key, value] of formData) {
      reviewAppointmentData[key] = value;
    }

    // Perfom mutation
    reviewAppointmentMutation.mutate(
      {
        url: `/user/appointment/${appointmentId}/review`,
        body: reviewAppointmentData,
      },
      {
        onError: (error) => setErrMsg(error.message),
        onSuccess: () => {
          queryClient.invalidateQueries([`appointment, ${appointmentId}`]);
          queryClient.invalidateQueries(["appointments"]);
          queryClient.invalidateQueries(["allAppointments"]);
          navigate(-1);
        },
      }
    );
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Review Appointment | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmdinc.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {reviewAppointmentMutation.isLoading && <TopBarProgress />}
          <p
            className={
              errMsg
                ? "rounded-md p-4 my-4 shadow-md border-0 border-l-4 border-ihs-green-shade-500 text-slate-500 font-thin md:text-lg text-sm"
                : "absolute -left-[99999px]"
            }
            aria-live="assertive"
          >
            <span className="flex items-center">
              <ExclamationCircleIcon className="text-ihs-green w-6 mr-2 inline" />
              {errMsg}
            </span>
          </p>
          <button
            className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
            onClick={() => navigate(-1)}
          >
            <ChevronLeftIcon className="w-6" />{" "}
            <p className="text-lg px-5">Back</p>
          </button>

          <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
            <div className="flex">
              <AnnotationIcon className="md:w-14 w-8 md:ml-10 ml-3" />
              <h3 className="md:text-3xl text-lg py-8 md:px-8 px-2">
                Review Appointment
              </h3>
            </div>
          </div>

          <form className="my-16 space-y-0" onSubmit={handleSubmit}>
            {/*Review*/}
            <div className="flex md:flex-row flex-col">
              <div>
                <label
                  htmlFor="review"
                  className="block text-md font-medium text-gray-500"
                >
                  Review <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    id="review"
                    name="review"
                    required
                    placeholder="It was a pleasant experience"
                    autoComplete="current-review"
                    className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-96 md:w-72"
                  />
                </div>
              </div>
            </div>

            {/*Rating*/}
            <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
              <div>
                <label
                  htmlFor="rating"
                  className="block text-md font-medium text-gray-500"
                >
                  Service <span className="text-red-600">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="rating"
                    name="rating"
                    required
                    className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 text-gray-500 lg:w-96 md:w-72"
                  >
                    <option value="">Rate your appointment</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </>
    </HelmetProvider>
  );
};

export default ReviewAppointment;
