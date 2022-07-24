import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { logoutUserAsync, refreshTokenAsync, setAuthenticated } from '../redux/slices/accountSlice';

export const authenticate = (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const rememberMe = localStorage.getItem('rememberMe');

  // If "Remember Me" is selected
  // Token refresher – ensures token is always valid while logged in
  if (rememberMe === 1) {
    dispatch(setAuthenticated());

    if (accessToken) {
      axios.defaults.headers.common.Authorization = accessToken;
      const decodedToken = jwtDecode(accessToken);
      // If token expired, refresh token
      if (decodedToken.exp * 1000 < Date.now()) {
        dispatch(refreshTokenAsync(refreshToken));
        setTimeout(() => {
          countdownAndRefresh(dispatch, decodedToken, refreshToken);
        }, 4000);
        // If token valid, set timer until expiry and then refresh token
      } else {
        countdownAndRefresh();
      }
      // If token doesn"t exist for some reason, retrieves new token
    } else {
      dispatch(refreshTokenAsync(refreshToken));
      setTimeout(() => {
        countdownAndRefresh(dispatch, null, refreshToken);
      }, 4000);
    }

    // If "Remember Me" not selected, logout user when token expires
  } else if (rememberMe === 0) {
    dispatch(setAuthenticated());

    if (accessToken) {
      axios.defaults.headers.common.Authorization = accessToken;
      const decodedToken = jwtDecode(accessToken);
      const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
      if (timeUntilExpiry <= 0) {
        dispatch(logoutUserAsync());
        window.location.href = '/login';
      } else {
        setTimeout(() => {
          dispatch(logoutUserAsync());
          window.location.href = '/login';
        }, timeUntilExpiry);
      }
    } else {
      /* store.dispatch(logoutUser());
                window.location.href = "/login"; */
    }
  }
};

const countdownAndRefresh = (dispatch, decodedToken, refreshToken) => {
  const currentTimeUntilExpiry = decodedToken.exp * 1000 - Date.now();
  console.log('Time until token expiry :', currentTimeUntilExpiry);

  setTimeout(() => {
    dispatch(refreshTokenAsync(refreshToken));
    setTimeout(() => {
      countdownAndRefresh();
    }, 4000);
  }, currentTimeUntilExpiry);
};
