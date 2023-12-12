const Modal = ({ setToggleModal, executeFunction, message, header }) => {
    const handleYesClick = () => {
        executeFunction();
    };
    const handleCancelClick = () => {
        setToggleModal(false);
    };

    return (
        <div className="bg-zinc-200 opacity-90 fixed inset-0 z-50   ">
            <div className="flex h-screen justify-center items-center">
                <div className="w-full md:w-1/3 mx-auto">
                    <div className=" flex flex-col p-5 rounded-lg shadow bg-white">
                        <div className="flex flex-col items-center text-center">
                            <div className="inline-block p-4 bg-ihs-green-shade-50 rounded-full">
                                <svg
                                    className="w-12 h-12 fill-current text-ihs-green"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M0 0h24v24H0V0z" fill="none" />
                                    <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z" />
                                </svg>
                            </div>
                            <h2 className="mt-2 md:text-2xl font-semibold text-gray-800">{header}</h2>
                            <p className="mt-2 md:text-xl text-gray-600 leading-relaxed">{message}</p>
                        </div>

                        <div className="flex items-center mt-3">
                            <button
                                className="flex-1 px-4 py-2 bg-gray-100 text-ihs-green md:text-lg text-sm font-medium rounded-md"
                                onClick={handleCancelClick}
                            >
                                Cancel
                            </button>

                            <button
                                className="flex-1 px-4 py-2 ml-2 text-white md:text-lg text-sm font-medium rounded-md"
                                onClick={handleYesClick}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
