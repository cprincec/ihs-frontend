import { UserCircleIcon } from "@heroicons/react/outline";
import BackButton from "./BackButton";

const PageHeading = ({ pageName, icon: Icon, previousPageName, previousUrl, children }) => {
    return (
        <>
            <BackButton navigateTo={previousPageName} url={previousUrl} />

            <div className="flex justify-between items-center bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
                <div className="flex py-4 px-8 space-x-4 items-center">
                    {Icon ? <Icon className="w-8" /> : <UserCircleIcon className="w-8" />}
                    <h3 className="text-xl font-bold">{pageName}</h3>
                </div>
                {children}
            </div>
        </>
    );
};
export default PageHeading;
