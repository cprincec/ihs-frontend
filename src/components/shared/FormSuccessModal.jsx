const FormSuccessModal = ({ successMessage, handleCancelClick }) => {
    return (
        <div className="grid gap-y-4 sm:gap-y-6 px-4 items-center justify-items-center overflow-y-auto m-auto bg-white rounded-lg">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-12 h-12 text-ihs-green"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <h2 className="md:text-xl font-semibold text-gray-800 mt-[-.5rem]">{successMessage}</h2>

            <button
                className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md bg-ihs-green"
                onClick={handleCancelClick}
            >
                Done
            </button>
        </div>
    );
};

export default FormSuccessModal;
