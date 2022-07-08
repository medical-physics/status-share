import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  getAppName,
  postAppName
} from '../api/accountAPI'
import axios from 'axios'

const initialState = {
  authenticated: false,
  admin: false,
  rememberMe: false,
  appName: 'Medical Physics: Status Share',
  truncatedAppName: false,
  updateTime: new Date()
}

export const loginUserAsync = createAsyncThunk(
  'account/loginUser',
  async (credentials, { dispatch }) => {
    const response = await loginUser(credentials.email, credentials.password)
    dispatch(setAuthorizationHeader({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken
    }))
    return response
  }
)

export const refreshTokenAsync = createAsyncThunk(
  'account/refreshToken',
  async (token) => {
    const response = await refreshAccessToken(token)
    const accessToken = response.accessToken
    localStorage.setItem('accessToken', accessToken)
    return accessToken
  }
)

export const logoutUserAsync = createAsyncThunk(
  'account/logoutUser',
  async (_, { dispatch }) => {
    logoutUser()
    dispatch(setUnauthenticated())
  }
)

export const getAppNameAsync = createAsyncThunk(
  'account/getAppName',
  async (_, { dispatch }) => {
    const response = await getAppName()
    dispatch(setAppName({ appName: response.appName }))
  }
)

export const setAppNameAsync = createAsyncThunk(
  'account/setAppName',
  async (newAppName, { dispatch }) => {
    const response = await postAppName(newAppName)
    dispatch(setAppName({ appName: response.appName }))
  }
)

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.authenticated = true
    },
    setUnauthenticated: (state) => {
      state.authenticated = false
      state.admin = false
      state.rememberMe = false
    },
    setAdminAccount: (state) => {
      state.admin = true
    },
    setRememberMe: (state) => {
      state.rememberMe = true
    },
    setAppName: (state, action) => {
      state.appName = action.payload.appName
    },
    setDefaultName: (state) => {
      state.appName = 'Medical Physics: Status Share'
    },
    setUpdateTime: (state) => {
      state.updateTime = new Date()
    },
    truncateAppName: (state) => {
      state.truncatedAppName = true
    },
    detruncateAppName: (state) => {
      state.truncatedAppName = false
    },
    setAuthorizationHeader: (state, action) => {
      const accessToken = `Bearer ${action.payload.accessToken}`
      const refreshToken = `Bearer ${action.payload.refreshToken}`
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      axios.defaults.headers.common.Authorization = accessToken
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {

      })
  }
})

export const {
  setAuthenticated,
  setUnauthenticated,
  setAdminAccount,
  setRememberMe,
  setAppName,
  setDefaultName,
  setUpdateTime,
  truncateAppName,
  detruncateAppName,
  setAuthorizationHeader
} = accountSlice.actions

export default accountSlice.reducer
