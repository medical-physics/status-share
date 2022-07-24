import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getUsers,
  getUser,
  postStatusUpdate,
  updateUserPresence,
  updateUserProfile,
  addOneUser,
  deleteOneUser
} from '../api/usersAPI';
import {
  loadingUser,
  stopLoadingUser,
  loadingUI,
  stopLoadingUI,
  setErrors
} from './uiSlice';
import { setUpdateTime } from './accountSlice';

const initialState = {
  users: [],
  user: {
    _id: '',
    email: '',
    memo: '',
    name: '',
    phone: '',
    present: true,
    priority: 1,
    status: '',
    statusTime: '',
    team: '',
    teamId: '',
    unreadMessages: 0
  },
  loadingUsersData: false
};

export const getUserAsync = createAsyncThunk(
  'users/getUser',
  async (userId, { dispatch, getState }) => {
    dispatch(loadingUI());
    const users = getState().users.users;
    let user = await users.find((element) => element.userId === userId);

    if (user === undefined) {
      user = await getUser(userId);
    }

    dispatch(stopLoadingUI());
    return user;
  }
);

export const getUsersAsync = createAsyncThunk(
  'users/getUsers',
  async (_, { dispatch }) => {
    const response = await getUsers();
    dispatch(setUpdateTime());
    return response;
  }
);

export const updateStatusAsync = createAsyncThunk(
  'users/updateStatus',
  async (statusObj, { dispatch }) => {
    try {
      dispatch(updateStatus(statusObj.statusData));
      const response = await postStatusUpdate(statusObj.userId, statusObj.statusData);
      return response;
    } catch (err) {
      console.error(err);
      dispatch(setErrors(err.response.data));
    }
  }
);

export const markPresentAsync = createAsyncThunk(
  'users/markPresent',
  async (userId, { dispatch }) => {
    try {
      dispatch(markPresent(userId));
      const response = await updateUserPresence(userId, true);
      return response;
    } catch (err) {
      console.error(err);
      dispatch(markNotPresent(userId));
    }
  }
);

export const markNotPresentAsync = createAsyncThunk(
  'users/markNotPresent',
  async (userId, { dispatch }) => {
    try {
      dispatch(markNotPresent(userId));
      const response = await updateUserPresence(userId, false);
      return response;
    } catch (err) {
      console.error(err);
      dispatch(markPresent(userId));
    }
  }
);

export const editProfileAsync = createAsyncThunk(
  'users/editProfile',
  async (profileObj, { dispatch }) => {
    try {
      dispatch(loadingUser());
      const response = await updateUserProfile(profileObj);
      dispatch(stopLoadingUser());
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const addUserAsync = createAsyncThunk(
  'users/addUser',
  async (newUserData, { dispatch }) => {
    try {
      dispatch(loadingUser());
      const response = await addOneUser(newUserData);
      dispatch(stopLoadingUser());
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  'users/deleteUser',
  async (userId, { dispatch }) => {
    try {
      dispatch(loadingUser());
      const response = await deleteOneUser(userId);
      dispatch(stopLoadingUser());
      return response;
    } catch (err) {
      console.error(err);
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
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
      const index1 = state.users.findIndex(
        (user) => user._id === action.payload
      );
      state.users[index1].present = true;
      if (state.user._id === action.payload) {
        state.user.present = true;
      }
    },
    markNotPresent: (state, action) => {
      const index2 = state.users.findIndex(
        (user) => user._id === action.payload
      );
      state.users[index2].present = false;
      if (state.user._id === action.payload) {
        state.user.present = false;
      }
    },
    updateStatus: (state, action) => {
      const index3 = state.users.findIndex(
        (user) => user._id === action.payload.userId
      );
      state.users[index3].status = action.payload.status;
      state.users[index3].statusTime = action.payload.statusTime;
      if (state.user._id === action.payload.userId) {
        state.user.status = action.payload.status;
        state.user.statusTime = action.payload.statusTime;
      }
    },
    decrementUnreadMessages: (state, action) => {
      const index4 = state.users.findIndex(
        (user) => user._id === action.payload
      );
      state.users[index4].unreadMessages -= 1;
      if (state.user._id === action.payload) {
        state.user.unreadMessages -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.loadingUsersData = true;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.loadingUsersData = false;
        state.users = action.payload;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users = [
          action.payload,
          ...state.users
        ];
      })
      .addCase(editProfileAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        const index5 = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        state.users[index5].name = action.payload.name;
        state.users[index5].email = action.payload.email;
        state.users[index5].phone = action.payload.phone;
        state.users[index5].team = action.payload.team;
        state.users[index5].memo = action.payload.memo;
        if (state.user._id === action.payload._id) {
          state.user.name = action.payload.name;
          state.user.email = action.payload.email;
          state.user.phone = action.payload.phone;
          state.user.team = action.payload.team;
          state.user.memo = action.payload.memo;
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const index6 = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        state.users = [
          ...state.users.slice(0, index6),
          ...state.users.slice(index6 + 1)
        ];
      });
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
