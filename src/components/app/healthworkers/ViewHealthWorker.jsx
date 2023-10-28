import { ChevronLeftIcon, IdentificationIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import HealthWorkerDropdown from "./HealthWorkerDropdown";
import { capitalizeString } from "../../../utils/capitalizeString";
import useFetch from "../../../hooks/useFetch";

const ViewHealthWorker = () => {
  const navigate = useNavigate();
  const params = useParams();
  const healthWorkerId = params.healthWorkerId;

  const staleTime = 1000 * 60 * 5;
  const { isSuccess, data } = useFetch(
    `/worker/${healthWorkerId}`,
    `healthWorker, ${healthWorkerId}`,
    staleTime
  );

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>View Health Worker | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmia.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          <button
            className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
            onClick={() => navigate("/healthworkers")}
          >
            <ChevronLeftIcon className="w-6" />{" "}
            <p className="text-lg px-5">Back to Health Workers</p>
          </button>
          <div className="flex">
            <div className="flex-1">
              <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                <div className="flex">
                  <IdentificationIcon className="md:w-14 w-8 md:ml-10 ml-3" />
                  <h3 className="md:text-3xl text-lg py-8 md:px-8 px-2">
                    Health Worker Details
                  </h3>
                </div>

                {isSuccess && (
                  <HealthWorkerDropdown healthWorkerDetails={data} />
                )}
              </div>

              {isSuccess && (
                <div className="my-10 ml-5 text-gray-600 md:text-xl text-md">
                  <div className="grid grid-cols-4">
                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                      Full Name:
                    </p>
                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                      {capitalizeString(data.firstName)}{" "}
                      {capitalizeString(data.lastName)}{" "}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                      Email:
                    </p>
                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                      {data.email}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                      Phone Number:{" "}
                    </p>
                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                      {data.phone}{" "}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">
                      Qualification:{" "}
                    </p>
                    <p className="py-5 md:ml-5 md:col-start-2 col-span-2">
                      {data.qualification}{" "}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </HelmetProvider>
  );
};

export default ViewHealthWorker;
