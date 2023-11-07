import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { axiosPrivate } from "../../api/axios";

const initialState = {
    userAccess: {
        accessToken: "",
        userType: "",
        persist: true,
    },
    loggedInUser: {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        customerId: "",
    },
};

export const signInUser = createAsyncThunk("user/login", async (loginCredentials) => {
    try {
        const response = await axios.post("/user/login", JSON.stringify(loginCredentials), {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        if (!err.response) {
            return "No Server Response";
        } else if (err.response) {
            return err.response.data.message.replace("Error: ", "");
        } else {
            return "Something Went Wrong";
        }
    }
});

export const fetchUserProfile = createAsyncThunk("user/profile", async () => {
    try {
        const response = await axiosPrivate.get("/user/profile");

        return {
            id: response.data.data.id,
            firstName: response.data.data.firstName,
            lastName: response.data.data.lastName,
            phone: response.data.data.phone,
            email: response.data.data.email,
            customerId: response.data.data.stripeCustomerId,
        };
    } catch (err) {
        console.error(err);
    }
});
export const revertAll = createAction("REVERT_ALL");

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        togglePersist(state) {
            state.userAccess = { ...state.userAccess, persist: !state.userAccess.persist };
        },
        storeAuthInfo(state, action) {
            state.userAccess = {
                ...state.userAccess,
                accessToken: action.payload.accessToken,
                userType: action.payload.userType,
            };
        },
        storeLoggedInUser(state, { payload }) {
            state.loggedInUser = {
                ...state.loggedInUser,
                id: payload.id,
                firstName: payload.firstName,
                lastName: payload.lastName,
                phone: payload.phone,
                email: payload.email,
                customerId: payload.customerId,
            };
        },
    },
});

export const { storeAuthInfo, togglePersist, storeLoggedInUser } = authSlice.actions;

export default authSlice.reducer;
