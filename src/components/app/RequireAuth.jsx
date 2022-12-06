import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const RequireAuth = ({allowedUserTypes}) => {
	const { accessToken, userType } = useSelector((state) => state.auth.userAccess)

	const location = useLocation();

	return (
		userType && allowedUserTypes.includes(userType)
			? <Outlet />
			: accessToken
				? <Navigate to="/unauthorized" state={{from: location}} replace />
				: <Navigate to="/" state={{from: location}} replace />
	);
};

export default RequireAuth;