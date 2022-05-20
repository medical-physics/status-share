import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slices/accountSlice";
import usersReducer from "../slices/usersSlice";
import uiReducer from "../slices/uiSlice";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        users: usersReducer,
        ui: uiReducer
    }
});
