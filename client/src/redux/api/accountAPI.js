import bcrypt from "bcryptjs";
import axios from "axios";

export const loginUser = async (email, password) => {
    const encryptedPassword = await bcrypt.hash(password, 10);
    const credentials = {
        email: email,
        password: encryptedPassword
    };

    const data = await axios.post("/login", credentials);
    return data.json();
};

export const refreshAccessToken = async (refreshToken) => {
    axios.defaults.headers.common["Authorization"] = refreshToken;
    const data = await axios.post("/refreshLogin");
    return data.json();
};
