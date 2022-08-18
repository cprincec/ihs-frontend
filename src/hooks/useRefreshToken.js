import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = await axios.get("/refresh",
			{ withCredentials: true }
		);

		setAuth(prev => {
			console.log(JSON.stringify(prev));
			console.log(response.data.data);
			return { ...prev, accessToken: response.data.data };
		});

		// return an object with accessToken and userType
		return response.data.data;
	}

	return refresh;
}

export default useRefreshToken;