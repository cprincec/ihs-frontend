import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({allowedUserTypes}) => {
	const {auth} = useAuth();
	const location = useLocation();

	return (
		auth?.userType && allowedUserTypes.includes(auth.userType)
			? <Outlet />
			: auth?.accessToken
				? <Navigate to="/unauthorized" state={{from: location}} replace />
				: <Navigate to="/signin" state={{from: location}} replace />
	);
};

export default RequireAuth;