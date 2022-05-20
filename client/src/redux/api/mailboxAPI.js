import axios from "axios";

export const getMailbox = async (userId) => {
    const data = await axios.get(`/mailbox/${userId}`);
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

export const addOneMessage = async (newMessageData, userId) => {
    const data = await axios.post(`/mailbox/${userId}`, newMessageData);
    return data.json();
};

export const editOneMessage = async (messageData, messageId, userId) => {
    const data = await axios.post(`/mailbox/update/${userId}/${messageId}`, messageData);
    return data.json();
};
