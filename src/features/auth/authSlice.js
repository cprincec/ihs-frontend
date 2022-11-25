import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import api from "../../api/api"

const initialState = {
	userAccess: {
		accessToken: '',
		userType: '',
		persist: true,
	},
}

export const signInUser = createAsyncThunk('user/signin', async (loginCredentials) => {
	try {
		const response = await api.post("/user/login",
			JSON.stringify(loginCredentials),
			{ headers: { 'Content-Type': 'application/json' },
				withCredentials: true
			}
		);
		return response.data

	} catch (err) {
		if (!err.response) {
			return 'No Server Response';
		} else if (err.response) {
			return err.response.data.message.replace("Error: ", "");
		} else {
			return 'Something Went Wrong';
		}
	}

})

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		storeAuthInfo(state, { payload }) {
			state.userAccess = { ...state.userAccess, accessToken: payload.accessToken, userType: payload.userType}
		},
		togglePersist(state){
			state.userAccess = {...state.userAccess, persist: !state.userAccess.persist};
		}
	},
})

export const { storeAuthInfo, togglePersist } = authSlice.actions

export default authSlice.reducer