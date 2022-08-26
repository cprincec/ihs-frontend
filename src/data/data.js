import {
	ClipboardListIcon,
	CogIcon, GiftIcon,
	IdentificationIcon,
	TemplateIcon, UserGroupIcon,
} from "@heroicons/react/outline";

export const links = [
			{
				title: "dashboard",
				path: "dashboard",
				icon: <TemplateIcon  className="w-6" />,
			},
			{
				title: "beneficiaries",
				path: "beneficiaries",
				icon: <GiftIcon  className=" w-6" />,
			},
			{
				title: "appointments",
				path: "appointments",
				icon: <ClipboardListIcon  className="w-6" />,
			},
			{
				title: "services",
				path: "servicess",
				icon: <UserGroupIcon  className="w-6" />,
			},
			{
				title: "users",
				path: "users",
				icon: <UserGroupIcon  className="w-6" />,
			},
			{
				title: "health workers",
				path: "healthworkers",
				icon: <IdentificationIcon  className="w-6" />,
			}

];

export const footerLinks = [
	{
		title: "profile",
		path: "profile",
		icon: <CogIcon  className="w-6" />,
	}
];