import bcrypt from 'bcryptjs';
import axios from 'axios';

export const loginUser = async (email, password) => {
  const encryptedPassword = await bcrypt.hash(password, 10);
  const credentials = {
    email,
    password: encryptedPassword
  };

  const response = await axios.post('/login', credentials);
  return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
  axios.defaults.headers.common.Authorization = refreshToken;
  const response = await axios.post('/refreshLogin');
  return response.data;
};

export const logoutUser = async () => {
  localStorage.clear();
  delete axios.defaults.headers.common.Authorization;
};

export const getAppName = async () => {
  const response = await axios.get('/appname');
  return response.data;
};

export const postAppName = async (newAppName) => {
  const response = await axios.post('/appname', { appName: newAppName });
  return response.data;
};
