import axios from "axios";

export const getMailbox = async () => {
    const data = await axios.get("/mailbox");
    return data.json();
};
