import axios from "axios";

export const getUsers = async () => {
    const data = await axios.get("/users");
    return data.json();
};
