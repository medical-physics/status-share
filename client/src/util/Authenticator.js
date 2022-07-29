import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { store } from '../redux/store/store';
import {
  logoutUser,
  refreshTokenAsync,
  setAuthenticated,
  checkingAuth
} from '../redux/slices/accountSlice';

const BUFFER_TIME = 4000;

export const authenticate = () => {
  store.dispatch(checkingAuth());
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
  let decodedAccessToken;
  let decodedRefreshToken;
  let timeUntilExpiry;

  if (accessToken) {
    axios.defaults.headers.common.Authorization = accessToken;
    accessToken = accessToken.split(' ')[1];
    decodedAccessToken = jwtDecode(accessToken);
    timeUntilExpiry = decodedAccessToken.exp * 1000 - Date.now();
  } else {
    endSession();
  }

  if (refreshToken) {
    decodedRefreshToken = jwtDecode(refreshToken.split(' ')[1]);
    const isRefreshTokenExpired = decodedRefreshToken.exp * 1000 - Date.now() <= 0;
    if (isRefreshTokenExpired) {
      endSession();
    }
  }

  if (rememberMe && refreshToken) {
    if (timeUntilExpiry <= BUFFER_TIME) {
      countDownAndRefresh(refreshToken, BUFFER_TIME);
    } else {
      countDownAndRefresh(refreshToken, timeUntilExpiry);
    }
    store.dispatch(setAuthenticated());
  } else if (!rememberMe) {
    if (timeUntilExpiry <= 0) {
      endSession();
    } else {
      countDownAndEndSession(timeUntilExpiry);
    }
    store.dispatch(setAuthenticated());
  } else {
    endSession();
  }
  return Promise.resolve('Authentication successful.');
};

const endSession = () => {
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
  console.log('Time until token expiry:'.concat(' ', timeUntilExpiry));

  setTimeout(() => {
    store.dispatch(refreshTokenAsync(refreshToken))
      .then((res) => {
        const decodedAccessToken = jwtDecode(res);
        const newTimeUntilExpiry = decodedAccessToken.exp * 1000 - Date.now();
        countDownAndRefresh(refreshToken, newTimeUntilExpiry);
      });
  }, (timeUntilExpiry - BUFFER_TIME));
};
