import { UserCircleIcon } from "@heroicons/react/outline";
import BackButton from "./BackButton";

const PageHeading = ({ pageName, icon: Icon, previousPageName, previousUrl, children }) => {
    return (
        <>
            <BackButton navigateTo={previousPageName} url={previousUrl} />

            <div className="flex justify-between items-center bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600 md:pr-4">
                <div className="flex py-4 px-4 space-x-2 md:px-8 md:space-x-4 items-center">
                    {Icon ? <Icon className="w-8" /> : <UserCircleIcon className="w-8" />}
                    <h3 className="text-base md:text-xl font-bold">{pageName}</h3>
                </div>
                {children}
            </div>
        </>
    );
};
export default PageHeading;
