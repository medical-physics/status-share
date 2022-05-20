import axios from "axios";

export const getUsers = async () => {
    const data = await axios.get("/users");
    return data.json();
};

export const postStatusUpdate = async (userId, statusData) => {
    const data = await axios.post(`/user/status/${userId}`, statusData);
    return data.json();
};

export const updateUserPresence = async (userId, presence) => {
    const data = await axios.post(`/user/presence/${userId}`, { present: presence });
    return data.json();
};
