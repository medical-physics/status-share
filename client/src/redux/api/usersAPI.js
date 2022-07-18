import axios from 'axios';

export const getUsers = async () => {
  const response = await axios.get('/users');
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axios.get(`/user/${userId}`);
  return response.data;
};

export const postStatusUpdate = async (userId, statusData) => {
  const response = await axios.post(`/user/status/${userId}`, statusData);
  return response.data;
};

export const updateUserPresence = async (userId, presence) => {
  const response = await axios.post(`/user/presence/${userId}`, { present: presence });
  return response.data;
};

export const updateUserProfile = async (profileData) => {
  const data = await axios.post(`/user/${profileData.userId}`, profileData);
  return data.json();
};

export const addOneUser = async (newUserData) => {
  const data = await axios.post('/user', newUserData);
  return data.json();
};

export const deleteOneUser = async (userId) => {
  const data = await axios.delete(`/user/${userId}`);
  return data.json();
};
