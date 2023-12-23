import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  refreshAccessToken,
  getAppName,
  postAppName
} from "../api/accountAPI";
import {
  loadingUI,
  stopLoadingUI
} from "./uiSlice";
import axios from "axios";

const TOKEN_PREFIX = "Bearer";

const initialState = {
  darkMode: false,
  authenticated: false,
  admin: false,
  rememberMe: false,
  appName: "Medical Physics: Status Share",
  truncatedAppName: false,
  updateTime: new Date(),
  loadingLogin: false,
  checkingAuth: false,
  errors: null,
  viewOnly: false,
  accessToken: ""
};

export const loginUserAsync = createAsyncThunk(
  "account/loginUser",
  async (credentialsObj, { dispatch, rejectWithValue }) => {
    dispatch(loadingUI());
    try {
      const response = await loginUser(credentialsObj.email, credentialsObj.password);

      dispatch(stopLoadingUI());
      return response;
    } catch (error) {
      dispatch(stopLoadingUI());
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshTokenAsync = createAsyncThunk(
  "account/refreshToken",
  async (token) => {
    const response = await refreshAccessToken(token);
    return response;
  }
);

export const getAppNameAsync = createAsyncThunk(
  "account/getAppName",
  async () => {
    const cachedAppName = localStorage.getItem("appName");
    if (cachedAppName) {
      return { appName: cachedAppName };
    }

    const response = await getAppName();
    localStorage.setItem("appName", response.appName);
    return response;
  }
);

export const setAppNameAsync = createAsyncThunk(
  "account/setAppName",
  async (newAppName) => {
    const response = await postAppName(newAppName);
    localStorage.setItem("appName", response.appName);
    return response;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.authenticated = true;
      state.checkingAuth = false;
    },
    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setAdminAccount: (state) => {
      state.admin = true;
    },
    setRememberMe: (state) => {
      state.rememberMe = true;
    },
    setUpdateTime: (state) => {
      state.updateTime = new Date();
    },
    truncateAppName: (state) => {
      state.truncatedAppName = true;
    },
    detruncateAppName: (state) => {
      state.truncatedAppName = false;
    },
    checkingAuth: (state) => {
      state.checkingAuth = true;
    },
    setDarkMode: (state) => {
      state.darkMode = true;
      localStorage.setItem("darkMode", true);
    },
    setLightMode: (state) => {
      state.darkMode = false;
      localStorage.setItem("darkMode", false);
    },
    logoutUser: (state) => {
      localStorage.clear();
      delete axios.defaults.headers.common.Authorization;
      state.authenticated = false;
      state.admin = false;
      state.rememberMe = false;
      state.viewOnly = false;
      state.accessToken = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const accessToken = TOKEN_PREFIX.concat(" ", action.payload.accessToken);
        const refreshToken = TOKEN_PREFIX.concat(" ", action.payload.refreshToken);
        state.admin = action.payload.admin;
        state.viewOnly = action.payload.viewOnly;
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("admin", action.payload.admin);
        localStorage.setItem("viewOnly", action.payload.viewOnly);
        axios.defaults.headers.common.Authorization = accessToken;
        window.location.href = "/";
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.errors = action.payload;
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        const accessToken = TOKEN_PREFIX.concat(" ", action.payload.accessToken);
        localStorage.setItem("accessToken", accessToken);
      })
      .addCase(getAppNameAsync.fulfilled, (state, action) => {
        state.appName = action.payload.appName;
      })
      .addCase(setAppNameAsync.fulfilled, (state, action) => {
        state.appName = action.payload.appName;
      });
  }
});

export const {
  setAuthenticated,
  setToken,
  setAdminAccount,
  setRememberMe,
  setAppName,
  setUpdateTime,
  truncateAppName,
  detruncateAppName,
  checkingAuth,
  setDarkMode,
  setLightMode,
  logoutUser
} = accountSlice.actions;

export default accountSlice.reducer;
