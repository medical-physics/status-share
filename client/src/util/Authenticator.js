import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { logoutUserAsync, refreshTokenAsync, setAuthenticated } from '../redux/slices/accountSlice';

export const authenticate = () => {
  const token = localStorage.getItem('accessToken');
  const rememberMe = localStorage.getItem('rememberMe');

  // If "Remember Me" is selected
  // Token refresher – ensures token is always valid while logged in
  if (rememberMe === 1) {
    setAuthenticated();
    axios.defaults.headers.common.Authorization = token;
    if (token) {
      const decodedToken = jwtDecode(token);
      // If token expired, refresh token
      if (decodedToken.exp * 1000 < Date.now()) {
        refreshTokenAsync(localStorage.getItem('refreshToken'));
        setTimeout(() => {
          this.countdownAndRefresh();
        }, 4000);
        // If token valid, set timer until expiry and then refresh token
      } else {
        this.countdownAndRefresh();
      }
      // If token doesn"t exist for some reason, retrieves new token
    } else {
      refreshTokenAsync(localStorage.getItem('refreshToken'));
      setTimeout(() => {
        this.countdownAndRefresh();
      }, 4000);
    }

    // If "Remember Me" not selected, logout user when token expires
  } else if (rememberMe === 0) {
    setAuthenticated();
    axios.defaults.headers.common.Authorization = token;
    if (token) {
      const decodedToken = jwtDecode(token);
      const timeUntilExpiry = decodedToken.exp * 1000 - Date.now();
      if (timeUntilExpiry <= 0) {
        logoutUserAsync();
        window.location.href = '/login';
      } else {
        setTimeout(() => {
          logoutUserAsync();
          window.location.href = '/login';
        }, timeUntilExpiry);
      }
    } else {
      /* store.dispatch(logoutUser());
                window.location.href = "/login"; */
    }
  }
};

export const countdownAndRefresh = () => {
  const currentDecodedToken = jwtDecode(localStorage.getItem('FBIdToken'));
  const currentTimeUntilExpiry = currentDecodedToken.exp * 1000 - Date.now();
  console.log('Time until token expiry :', currentTimeUntilExpiry);

  setTimeout(() => {
    refreshTokenAsync(localStorage.getItem('refreshToken'));
    setTimeout(() => {
      countdownAndRefresh();
    }, 4000);
  }, currentTimeUntilExpiry);
};
