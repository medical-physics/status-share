import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadingUI, stopLoadingUI } from "./uiSlice";
import { setUpdateTime } from "./accountSlice";
import {
    addOneMessage,
    deleteOneMessage,
    editOneMessage,
    getMailbox,
    updateMessageReadStatus
} from "../api/mailboxAPI";
import { decrementUnreadMessages } from "./usersSlice";

const initialState = {
    mailbox: [],
    message: {},
    loadingMailbox: false
};

export const getMessageAsync = createAsyncThunk(
    "mailbox/getMessage",
    async (messageId, { dispatch, getState }) => {
        dispatch(loadingUI());

        const mailbox = getState().mailbox.mailbox;
        const message = mailbox.find((element) => element.messageId === messageId);

        if (message) {
            dispatch(setMessage(message));
        } else {
            dispatch(setMessage(null));
        }
        dispatch(stopLoadingUI());
    }
);

export const getMailboxAsync = createAsyncThunk(
    "mailbox/getMailbox",
    async (_, { dispatch }) => {
        try {
            dispatch(loadingMailboxData());

            const response = await getMailbox();
            const mailbox = response.mailbox;

            if (mailbox) {
                dispatch(setMailbox(mailbox));
                dispatch(setUpdateTime());
            }
        } catch (err) {
            console.error(err);
        }
    }
);

export const markMessageReadAsync = createAsyncThunk(
    "mailbox/markMessageRead",
    async (messageObj, { dispatch }) => {
        try {
            dispatch(markMessageRead(messageObj.messageId));
            dispatch(decrementUnreadMessages(messageObj.userId));

            const response = await updateMessageReadStatus(messageObj.messageId, messageObj.userId);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
);

export const deleteMessageAsync = createAsyncThunk(
    "mailbox/deleteMessage",
    async (messageObj, { dispatch }) => {
        try {
            dispatch(deleteMessage(messageObj.messageId));
            const response = await deleteOneMessage(messageObj.messageId, messageObj.userId);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
);

export const addMessageAsync = createAsyncThunk(
    "mailbox/addMessage",
    async (messageObj, { dispatch }) => {
        try {
            const response = await addOneMessage(messageObj.newMessageData, messageObj.userId);
            return response;
        } catch (err) {
            console.error(err);
        }
    }
);

export const editMessageAsync = createAsyncThunk(
    "mailbox/editMessage",
    async (messageObj, { dispatch }) => {
        try {
            dispatch(editMessage(messageObj.messageData));
            const response = await editOneMessage(
                messageObj.messageData,
                messageObj.messageId,
                messageObj.userId
            );
            return response;
        } catch (err) {
            console.error(err);
        }
    }
);

export const mailboxSlice = createSlice({
    name: "mailbox",
    initialState,
    reducers: {
        loadingMailboxData: (state) => {
            state.loadingMailbox = true;
        },
        setMailbox: (state, action) => {
            state.mailbox = action.payload
            state.loadingMailbox = false;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        markMessageRead: (state, action) => {
            let index1 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload
            );
            state.mailbox[index1].readStatus = true;
            if (state.message.messageId === action.payload) {
                state.message.readStatus = true;
            };
        },
        deleteMessage: (state, action) => {
            let index2 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload
            );
            state.mailbox = [
                ...state.mailbox.slice(0, index2),
                ...state.mailbox.slice(index2 + 1)
            ];
        },
        editMessage: (state, action) => {
            let index3 = state.mailbox.findIndex(
                (message) => message.messageId === action.payload.messageId
            );
            state.mailbox[index3].message = action.payload.message;
            state.mailbox[index3].senderContact = action.payload.senderContact;
            state.mailbox[index3].senderName = action.payload.senderName;
            state.mailbox[index3].subject = action.payload.subject;
            if (state.message.messageId === action.payload.messageId) {
                state.message.message = action.payload.message;
                state.message.senderContact = action.payload.senderContact;
                state.message.senderName = action.payload.senderName;
                state.message.subject = action.payload.subject;
            };
        }
    }
});

export const {
    loadingMailboxData,
    setMailbox,
    setMessage,
    markMessageRead,
    deleteMessage,
    editMessage
} = mailboxSlice.actions;

export default mailboxSlice.reducer;
