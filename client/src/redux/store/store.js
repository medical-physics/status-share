import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "../example/reducer";

export const store = configureStore({
    reducer: {
        example: exampleReducer
    }
});
