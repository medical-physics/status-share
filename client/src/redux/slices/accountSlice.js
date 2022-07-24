import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  getAppName,
  postAppName
} from '../api/accountAPI';
import {
  loadingUI,
  stopLoadingUI
} from './uiSlice';
import axios from 'axios';

const TOKEN_PREFIX = 'Bearer';

const initialState = {
  authenticated: false,
  admin: false,
  rememberMe: false,
  appName: 'Medical Physics: Status Share',
  truncatedAppName: false,
  updateTime: new Date(),
  loadingLogin: false,
  checkingAuth: false
};

export const loginUserAsync = createAsyncThunk(
  'account/loginUser',
  async (credentials, { dispatch }) => {
    dispatch(loadingUI());
    const response = await loginUser(credentials.email, credentials.password);
    dispatch(stopLoadingUI());
    return response;
  }
);

export const refreshTokenAsync = createAsyncThunk(
  'account/refreshToken',
  async (token) => {
    const response = await refreshAccessToken(token);
    const accessToken = TOKEN_PREFIX.concat(' ', response.accessToken);
    return accessToken;
  }
);

export const logoutUserAsync = createAsyncThunk(
  'account/logoutUser',
  async (_, { dispatch }) => {
    logoutUser();
    dispatch(setUnauthenticated());
  }
);

export const getAppNameAsync = createAsyncThunk(
  'account/getAppName',
  async () => {
    const response = await getAppName();
    return response;
  }
);

export const setAppNameAsync = createAsyncThunk(
  'account/setAppName',
  async (newAppName, { dispatch }) => {
    const response = await postAppName(newAppName);
    return response;
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.authenticated = true;
      state.checkingAuth = false;
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const accessToken = TOKEN_PREFIX.concat(' ', action.payload.accessToken);
        const refreshToken = TOKEN_PREFIX.concat(' ', action.payload.refreshToken);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common.Authorization = accessToken;
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.accessToken = action.payload;
        localStorage.setItem('accessToken', action.payload);
      })
      .addCase(getAppNameAsync.fulfilled, (state, action) => {
        state.appName = action.payload.appName;
      });
  }
});

export const {
  setAuthenticated,
  setUnauthenticated,
  setAdminAccount,
  setRememberMe,
  setAppName,
  setUpdateTime,
  truncateAppName,
  detruncateAppName,
  checkingAuth
} = accountSlice.actions;

export default accountSlice.reducer;
