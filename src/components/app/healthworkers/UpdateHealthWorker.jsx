import { ChevronLeftIcon, IdentificationIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";
import useFetch from "../../../hooks/useFetch";
import usePatch from "../../../hooks/usePatch";
import { useQueryClient } from "@tanstack/react-query";

TopBarProgress.config({
  barColors: {
    0: "#05afb0",
  },
  shadowBlur: 5,
});

const UpdateHealthWorker = () => {
  const navigate = useNavigate();
  const params = useParams();
  const healthWorkerId = params.healthWorkerId;

  const staleTime = 1000 * 60 * 5;
  const { isSuccess, data, isError, error, isLoading, refetch } = useFetch(
    `/worker/${healthWorkerId}`,
    `healthWorker, ${healthWorkerId}`,
    staleTime
  );

  const updateHealthWorkerMutation = usePatch();
  const queryClient = useQueryClient();

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Extract form input into formdata object
    const formData = new FormData(e.target);

    let healthWorkerData = {};
    for (const [key, value] of formData.entries()) {
      healthWorkerData[key] = value;
    }

    updateHealthWorkerMutation.mutate(
      {
        url: `/worker/${healthWorkerId}`,
        body: healthWorkerData,
      },
      {
        onSuccess: async () => {
          navigate(`/healthworkers`);
          refetch(); // fetch updated health worker data
          await queryClient.refetchQueries({ queryKey: ["healthWorkers"] });
        },
      }
    );
  };

  return (
    <HelmetProvider>
      <>
        <Helmet>
          <title>Update Health Worker | IHS Dashboard</title>
          <link rel="canonical" href="https://www.ihsmdinc.com/" />
        </Helmet>
        <div className="lg:px-20 lg:py-4 md:px-10 p-3">
          {isLoading && <TopBarProgress />}
          <button
            className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 lg:mt-10 my-5"
            onClick={() =>
              navigate(`/healthworkers/viewhealthworker/${healthWorkerId}`)
            }
          >
            <ChevronLeftIcon className="w-6" />{" "}
            <p className="text-lg px-5">Back to HealthWorkers</p>
          </button>
          {/*<div className="flex md:justify-start justify-center md:items-start items-center">*/}
          {/*	<div className="md:flex-1">*/}

          <div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
            <div className="flex">
              <IdentificationIcon className="md:w-14 w-8 md:ml-10 ml-3" />
              <h3 className="md:text-3xl text-lg py-8 md:px-8 px-2">
                Update Health Worker
              </h3>
            </div>
          </div>

          <form className="my-16 space-y-0" onSubmit={handleUpdate}>
            <p
              className={
                isError
                  ? "rounded-md p-4 mb-4 bg-ihs-green-shade-200 text-red-500 font-normal text-lg"
                  : "absolute -left-[99999px]"
              }
              aria-live="assertive"
            >
              {error}
            </p>

            {/* First Name and last Name */}
            {isSuccess && (
              <>
                <div className="flex md:flex-row flex-col">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-md font-medium text-gray-500"
                    >
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="John"
                        autoComplete="current-firstName"
                        defaultValue={data.firstName}
                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"
                      />
                    </div>
                  </div>

                  <div className="md:ml-10 md:mt-0 mt-5">
                    <label
                      htmlFor="lastName"
                      className="block text-md font-medium text-gray-500"
                    >
                      Last Name<span className="text-red-600">*</span>
                    </label>
                    <div className="md:mt-1">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Doe"
                        autoComplete="current-lastName"
                        defaultValue={data.lastName}
                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"
                      />
                    </div>
                  </div>
                </div>

                {/* Email and Phone Number */}
                <div className="flex md:flex-row flex-col md:pt-10 pt-5 ">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-md font-medium text-gray-500"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="johndoe@email.com"
                        autoComplete="current-email"
                        defaultValue={data.email}
                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"
                      />
                    </div>
                  </div>

                  <div className="md:ml-10 md:mt-0 mt-5">
                    <label
                      htmlFor="phone"
                      className="block text-md font-medium text-gray-500"
                    >
                      Phone Number<span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="Phone Number"
                        autoComplete="current-phone"
                        defaultValue={data.phone}
                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"
                      />
                    </div>
                  </div>
                </div>

                {/* Qualification */}
                <div className="flex md:pt-10 pt-5 md:flex-row flex-col">
                  <div>
                    <label
                      htmlFor="qualification"
                      className="block text-md font-medium text-gray-500"
                    >
                      Qualification <span className="text-red-600">*</span>
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        required
                        autoComplete="current-qualification"
                        defaultValue={data.qualification}
                        className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 lg:w-80 md:w-72"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="px-4 py-3 my-20 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 w-96 text-lg"
                  >
                    Update
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
        {/*	</div>*/}
        {/*</div>*/}
      </>
    </HelmetProvider>
  );
};

export default UpdateHealthWorker;
