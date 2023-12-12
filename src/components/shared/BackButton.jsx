import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const BackButton = ({ url, navigateTo }) => {
    const navigate = useNavigate();
    return (
        <button
            className="p-0 flex flex-row items-center justify-start border-0 bg-transparent text-slate-500 lg:mt-10 lg:mb-8 my-4 hover:bg-transparent"
            onClick={() => navigate(url)}
        >
            <ChevronLeftIcon className="w-4" />
            <p className="text-sm px-4">Back to {navigateTo}</p>
        </button>
    );
};
export default BackButton;
