
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import accountReducer from "./reducers/accountReducer";
import teamsReducer from "./reducers/teamsReducer";
import uiReducer from "./reducers/uiReducer";
import usersReducer from "./reducers/usersReducer";
import mailboxReducer from "./reducers/mailboxReducer";

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    account: accountReducer,
    teams: teamsReducer,
    users: usersReducer,
    mailbox: mailboxReducer,
    UI: uiReducer
});

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;
