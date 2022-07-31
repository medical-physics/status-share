import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { store } from '../redux/store/store';
import {
  logoutUser,
  refreshTokenAsync,
  setAuthenticated,
  checkingAuth,
  setToken
} from '../redux/slices/accountSlice';

const BUFFER_TIME = 4000;

export const authenticate = async () => {
  store.dispatch(checkingAuth());
  let accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
  let decodedAccessToken;
  let decodedRefreshToken;
  let timeUntilExpiry;

  try {
    if (accessToken) {
      axios.defaults.headers.common.Authorization = accessToken;
      accessToken = accessToken.split(' ')[1];
      decodedAccessToken = jwtDecode(accessToken);
      timeUntilExpiry = decodedAccessToken.exp * 1000 - Date.now();
      store.dispatch(setToken(accessToken));
    } else {
      return endSession();
    }

    if (refreshToken) {
      decodedRefreshToken = jwtDecode(refreshToken.split(' ')[1]);
      const isRefreshTokenExpired = decodedRefreshToken.exp * 1000 - Date.now() <= 0;
      if (isRefreshTokenExpired) {
        return endSession();
      }
    }
  } catch (err) {
    return endSession();
  }

  if (rememberMe && refreshToken) {
    if (timeUntilExpiry <= BUFFER_TIME) {
      countDownAndRefresh(refreshToken, BUFFER_TIME);
    } else {
      store.dispatch(setAuthenticated());
      countDownAndRefresh(refreshToken, timeUntilExpiry);
    }
    return Promise.resolve('Authentication successful.');
  } else if (!rememberMe) {
    if (timeUntilExpiry <= 0) {
      return endSession();
    } else {
      countDownAndEndSession(timeUntilExpiry);
      store.dispatch(setAuthenticated());
      return Promise.resolve('Authentication successful.');
    }
  } else {
    return endSession();
  }
};

const endSession = async () => {
  store.dispatch(logoutUser());
  window.location.href = '/login';
  return Promise.reject(new Error('Authentication failed or session expired.'));
};

const countDownAndEndSession = (timeUntilExpiry) => {
  console.log('Time until token expiry:'.concat(' ', timeUntilExpiry));

  setTimeout(() => {
    endSession();
  }, (timeUntilExpiry - BUFFER_TIME));
};

const countDownAndRefresh = (refreshToken, timeUntilExpiry) => {
  console.log('Time until token refresh:'.concat(' ', timeUntilExpiry));

  setTimeout(() => {
    store.dispatch(refreshTokenAsync(refreshToken))
      .then((res) => {
        const decodedAccessToken = jwtDecode(res.payload.split(' ')[1]);
        const newTimeUntilExpiry = decodedAccessToken.exp * 1000 - Date.now();
        store.dispatch(setAuthenticated());
        countDownAndRefresh(refreshToken, newTimeUntilExpiry);
      })
      .catch((err) => {
        throw err;
      });
  }, (timeUntilExpiry - BUFFER_TIME));
};
