import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { store } from '../redux/store/store';
import {
  logoutUserAsync,
  refreshTokenAsync,
  setAuthenticated,
  checkingAuth
} from '../redux/slices/accountSlice';

export const authenticate = () => {
  store.dispatch(checkingAuth());
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');
  const rememberMe = JSON.parse(localStorage.getItem('rememberMe'));
  let decodedAccessToken;
  let decodedRefreshToken;
  let timeUntilExpiry;

  if (accessToken) {
    accessToken = accessToken.split(' ')[1];
    decodedAccessToken = jwtDecode(accessToken);
    timeUntilExpiry = decodedAccessToken.exp * 1000 - Date.now();
    axios.defaults.headers.common.Authorization = accessToken;
  } else {
    endSession();
  }

  if (refreshToken) {
    refreshToken = refreshToken.split(' ')[1];
    decodedRefreshToken = jwtDecode(refreshToken);
    const isRefreshTokenExpired = decodedRefreshToken.exp * 1000 - Date.now() <= 0;
    if (isRefreshTokenExpired) {
      endSession();
    }
  }

  if (rememberMe && refreshToken) {
    if (timeUntilExpiry <= 0) {
      countDownAndRefresh(refreshToken, 0);
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
};

const endSession = () => {
  store.dispatch(logoutUserAsync());
  window.location.href = '/login';
};

const countDownAndEndSession = (timeUntilExpiry) => {
  console.log('Time until token expiry:'.concat(' ', timeUntilExpiry));

  setTimeout(() => {
    endSession();
  }, timeUntilExpiry);
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
  }, timeUntilExpiry);
};
