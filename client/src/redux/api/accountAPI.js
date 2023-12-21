import axios from "axios";

export const loginUser = async (email, password) => {
  const response = await axios.post("/login", {}, {
    auth: {
      username: email,
      password
    }
  });
  return response.data;
};

export const refreshAccessToken = async (refreshToken) => {
  axios.defaults.headers.common.Authorization = refreshToken;
  const response = await axios.post("/refreshLogin");
  return response.data;
};

export const getAppName = async () => {
  const response = await axios.get("/appname");
  return response.data;
};

export const postAppName = async (newAppName) => {
  const response = await axios.post("/appname", { appName: newAppName });
  return response.data;
};
