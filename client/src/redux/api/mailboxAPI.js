import axios from "axios";

export const getMailbox = async (userId, page, pageSize) => {
  const response = await axios.get(
    `/mailbox/${userId}?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
};

export const updateMessageReadStatus = async (messageId, userId) => {
  const response = await axios.post(`/mailbox/read/${userId}/${messageId}`);
  return response.data;
};

export const deleteOneMessage = async (messageId, userId) => {
  const response = await axios.delete(`/mailbox/${userId}/${messageId}`);
  return response.data;
};

export const addOneMessage = async (newMessageData, userId) => {
  const response = await axios.post(`/mailbox/${userId}`, newMessageData);
  return response.data;
};

export const editOneMessage = async (messageData, messageId, userId) => {
  const response = await axios.post(
    `/mailbox/update/${userId}/${messageId}`,
    messageData
  );
  return response.data;
};
