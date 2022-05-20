import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../slices/accountSlice";
import usersReducer from "../slices/usersSlice";
import uiReducer from "../slices/uiSlice";
import teamsReducer from "../slices/teamsSlice";
import mailboxReducer from "../slices/mailboxSlice";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        users: usersReducer,
        UI: uiReducer,
        teams: teamsReducer,
        mailbox: mailboxReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
