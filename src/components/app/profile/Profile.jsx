import React, {useState, useEffect} from 'react';
import {ChevronLeftIcon, UserCircleIcon} from "@heroicons/react/outline";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {Helmet, HelmetProvider} from "react-helmet-async";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
	barColors: {
		"0": "#05afb0"
	},
	shadowBlur: 5
});

const UPDATE_PASSWORD = '/user/updatePassword';

const Profile = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const axiosPrivate = useAxiosPrivate();
	const {loggedInUser, setLoggedInUser, setAuth} = useAuth();

	const [newPassword, setNewPassword] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect( () => {
		let isMounted = true;
		const controller = new AbortController();

		const getLoggedInUser = async () => {
			try {
				const response = await axiosPrivate.get(
					"/user/profile",
					{signal: controller?.signal}
				);

				const loggedInUserObject = {
					id: response.data.data.id,
					firstName: response.data.data.firstName,
					lastName: response.data.data.lastName,
					phone: response.data.data.phone,
					email: response.data.data.email,
					customerId: response.data.data.stripeCustomerId

				}

				isMounted && setLoggedInUser(loggedInUserObject);

				// todo: move the next line to the auth context
				setLoading(false)
			} catch (err){
				// if status is 401 then redirect to signin page
				if (err?.response?.status === 401) {
					navigate('/', {state: {from: location}, replace: true});
				}
				console.error(err)
			}
		}
		getLoggedInUser();

		return () => {
			isMounted = false;
			controller.abort();
		}
	}, [axiosPrivate, setLoggedInUser, location, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		await axiosPrivate.post(UPDATE_PASSWORD,
			JSON.stringify({ password: newPassword }),
			{ headers: { 'Content-Type': 'application/json' },
				withCredentials: true
			}
		);

		setLoading(false);
		setNewPassword('');

		setAuth({});
		localStorage.clear();
		navigate('/');
	}

	const handlePortal = async (e) => {
		e.preventDefault();

		setLoading(true);

		try	{
			const res = await axiosPrivate.post("/portal",

				JSON.stringify( {
					customer: loggedInUser.customerId,
				}),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true
				}
			)

			setLoading(false);

			const body = await res.data
			window.location.href = body.url

		} catch (e) {
			console.log(`Uncaught Exception ${e}`);
		}
	}

	return (
		<HelmetProvider>
			<>
				<Helmet>
					<title>My Profile | IHS Dashboard</title>
					<link rel="canonical" href="https://www.ihsmdinc.com/" />
				</Helmet>
				<>
			{loading && <TopBarProgress />}
			<div className="lg:p-20 md:p-10 p-3">
				<button className="flex flex-row items-center justify-start h-10 border-0 bg-transparent text-slate-500 md:mb-20 md:mt-0 my-10" onClick={() => navigate("/dashboard")}>
					<ChevronLeftIcon className="w-6" /> <p className="text-lg px-5">Back to Dashboard</p>
				</button>
				<div className="flex">
					<div className="flex-1">
						<div className="flex justify-between items-center h-24 bg-ihs-green-shade-50 rounded-md shadow-sm text-gray-600">
							<div className="flex">
								<UserCircleIcon className="md:w-14 w-8 md:ml-10 ml-3" />
								<h3 className="md:text-3xl sm:text-2xl text-xl py-8 md:px-8 px-2">My Profile</h3>
							</div>

						</div>

						<div className="my-10 ml-5 text-gray-600 md:text-xl text-md" >
							<div className="grid grid-cols-5">
								<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">First Name: </p>
								<p className="py-5 md:ml-5 md:col-start-2">{loggedInUser ? loggedInUser?.firstName : ""} </p>
							</div>
							<div className="grid grid-cols-5">
								<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Last Name: </p>
								<p className="py-5 md:ml-5 md:col-start-2">{loggedInUser ? loggedInUser?.lastName : ""} </p>
							</div>
							<div className="grid grid-cols-5">
								<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Email: </p>
								<p className="py-5 md:ml-5 md:col-start-2">{loggedInUser ? loggedInUser?.email : ""} </p>
							</div>
							<div className="grid grid-cols-5">
								<p className="py-5 font-semibold col-start-1 md:col-span-1 col-span-2">Phone Number: </p>
								<p className="py-5 md:ml-5 md:col-start-2">{loggedInUser ? loggedInUser?.phone : ""} </p>
							</div>
						</div>

					</div>
				</div>

				<hr className="my-10"/>

				<form onSubmit={handlePortal}>
					<input type="hidden" name="priceId" id="priceId" value="price_1LrhbqIGWAGjsS3FN6qfb8fW" />
					<button type="submit" className="px-4 py-3 mt-5 mb-5 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 sm:w-96 w-72 text-lg">
						Visit Customer Portal
					</button>
				</form>

				<hr className="my-10"/>

				<p className="text-xl text-ihs-green">Change Password</p>

				<form className="my-5 space-y-0" onSubmit={handleSubmit}>

					{/*Password*/}
					<div className="flex flex-col">

						<div className="my-5">
							<label
								htmlFor="newPassword"
								className="block text-md font-medium text-gray-500"
							>
								New Password
								<span className="text-red-600">*</span>
							</label>
							<div className="mt-1">
								<input
									type="password"
									id="newPassword"
									required
									placeholder="New Password"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									className="w-full border border-gray-300 px-3 py-3 rounded-lg shadow-sm focus:outline-none focus:border:bg-ihs-green-shade-500 focus:ring-1 focus:ring-ihs-green-shade-600 sm:w-96 w-72"/>
							</div>
						</div>
					</div>

					<div className="flex justify-start">
						<button type="submit" className="px-4 py-3 mt-5 mb-10 bg-ihs-green hover:font-bold focus: outline-none focus:ring-2 focus:ring-ihs-green-shade-500 sm:w-96 w-72 text-lg">
							Update Password
						</button>
					</div>
				</form>

			</div>
		</>
			</>
		</HelmetProvider>
	);
};

export default Profile;