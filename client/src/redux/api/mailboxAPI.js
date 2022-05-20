import axios from "axios";

export const getMailbox = async () => {
    const data = await axios.get("/mailbox");
    return data.json();
};

export const updateMessageReadStatus = async (messageId, userId) => {
    const data = await axios.post(
        `/mailbox/read/${userId}/${messageId}`,
        { readStatus: true }
    );
    return data.json();
};

export const deleteOneMessage = async (messageId, userId) => {
    const data = await axios.delete(`/mailbox/${userId}/${messageId}`);
    return data.json();
};
