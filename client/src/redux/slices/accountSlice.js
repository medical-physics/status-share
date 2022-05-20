import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
    loginUser,
    logoutUser,
    refreshAccessToken,
    getAppName,
    postAppName
} from "../api/accountAPI";

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
    async (credentials) => {
        const response = await loginUser(credentials.email, credentials.password);
        return response;
    }
);

export const refreshTokenAsync = createAsyncThunk(
    "account/refreshToken",
    async (token) => {
        const response = await refreshAccessToken(token);
        return response.accessToken;
    }
);

export const logoutUserAsync = createAsyncThunk(
    "account/logoutUser",
    async (_, { dispatch }) => {
        logoutUser();
        dispatch(setUnauthenticated());
    }
);

export const getAppNameAsync = createAsyncThunk(
    "account/getAppName",
    async (_, { dispatch }) => {
        const response = await getAppName();
        dispatch(setAppName({ appName: response.appName }));
    }
);

export const setAppNameAsync = createAsyncThunk(
    "account/setAppName",
    async (newAppName, { dispatch }) => {
        const response = await postAppName(newAppName);
        dispatch(setAppName({ appName: response.appName }));
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

export const {
    setAuthenticated,
    setUnauthenticated,
    setAdminAccount,
    setRememberMe,
    setAppName
} = accountSlice.actions;

export default accountSlice.reducer;
