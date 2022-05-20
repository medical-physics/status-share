import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getUsers
} from "../api/usersAPI";
import {
    loadingUI,
    stopLoadingUI
} from "./uiSlice";
import { setUpdateTime } from "./accountSlice";

const initialState = {
    users: [],
    user: {},
    loadingUsersData: false
};

export const getUserAsync = createAsyncThunk(
    "users/getUser",
    async (userId, { dispatch, getState }) => {
        dispatch(loadingUI());

        const users = getState().users.users;
        const user = users.find((element) => element.userId === userId);

        if (user) {
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
        }
        dispatch(stopLoadingUI());
    }
);

export const getUsersAsync = createAsyncThunk(
    "users/getUsers",
    async (_, { dispatch }) => {
        dispatch(loadingUsersData());

        const response = await getUsers();
        const users = response.users;
        if (users) {
            dispatch(setUsers(users));
            dispatch(setUpdateTime());
        }

        return users;
    }
);

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        loadingUsersData: (state) => {
            state.loadingUsersData = true;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.loadingUsersData = false;
        },
        markPresent: (state, action) => {
            let index1 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index1].present = true;
            if (state.user.userId === action.payload) {
                state.user.present = true;
            }
        },
        markNotPresent: (state, action) => {
            let index2 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index2].present = false;
            if (state.user.userId === action.payload) {
                state.user.present = false;
            }
        },
        updateStatus: (state, action) => {
            let index3 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index3].status = action.payload.status;
            state.users[index3].statusTime = action.payload.statusTime;
            if (state.user.userId === action.payload.userId) {
                state.user.status = action.payload.status;
                state.user.statusTime = action.payload.statusTime;
            }
        },
        editUser: (state, action) => {
            let index4 = state.users.findIndex(
                (user) => user.userId === action.payload.userId
            );
            state.users[index4].name = action.payload.name;
            state.users[index4].email = action.payload.email;
            state.users[index4].phone = action.payload.phone;
            state.users[index4].team = action.payload.team;
            state.users[index4].memo = action.payload.memo;
            if (state.user.userId === action.payload.userId) {
                state.user.name = action.payload.name;
                state.user.email = action.payload.email;
                state.user.phone = action.payload.phone;
                state.user.team = action.payload.team;
                state.user.memo = action.payload.memo;
            }
        },
        decrementUnreadMessages: (state, action) => {
            let index5 = state.users.findIndex(
                (user) => user.userId === action.payload
            );
            state.users[index5].unreadMessages -= 1;
            if (state.user.userId === action.payload) {
                state.user.unreadMessages -= 1;
            }
        }
    }
});

export const {
    loadingUsersData,
    setUser,
    setUsers,
    markPresent,
    markNotPresent,
    updateStatus,
    editUser,
    decrementUnreadMessages
} = usersSlice.actions;

export default usersSlice.reducer;
