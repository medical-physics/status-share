import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  loadingTeam: false,
  loadingUser: false,
  errors: null
};

export const uiSlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setErrors: (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.loading = false;
      state.errors = null;
    },
    loadingUI: (state) => {
      state.loading = true;
    },
    stopLoadingUI: (state) => {
      state.loading = false;
    },
    loadingTeam: (state) => {
      state.loadingTeam = true;
    },
    stopLoadingTeam: (state) => {
      state.loadingTeam = false;
    },
    loadingUser: (state) => {
      state.loadingUser = true;
    },
    stopLoadingUser: (state) => {
      state.loadingUser = false;
    }
  }
});

export const {
  setErrors,
  clearErrors,
  loadingUI,
  stopLoadingUI,
  loadingTeam,
  stopLoadingTeam,
  loadingUser,
  stopLoadingUser
} = uiSlice.actions;

export default uiSlice.reducer;
