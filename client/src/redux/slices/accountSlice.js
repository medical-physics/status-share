import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../api/accountAPI";

const initialState = {
    authenticated: false,
    admin: false,
    rememberMe: false,
    appName: "",
    truncatedAppName: false,
    updateTime: new Date()
};

export const loginUserAsync = createAsyncThunk(
    "account/loginUser",
    async (credentials, { getState }) => {
        const response = await loginUser(credentials.email, credentials.password);
        return response;
    }
);

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAuthenticated: (state) => {
            state.authenticated = true;
        },
        setUnauthenticated: (state) => {
            state.authenticated = false;
            state.admin = false;
            state.rememberMe = false;
        },
        setAdminAccount: (state) => {
            state.admin = true;
        },
        setRememberMe: (state) => {
            state.rememberMe = true;
        },
        setAppName: (state, action) => {
            state.appName = action.payload.appName;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {

            })
    }
});

export const { example } = accountSlice.actions;

export default accountSlice.reducer;
