import { configureStore } from "@reduxjs/toolkit";
import authen from "./authenSlice";
import currentUser from "./currentUserSlice";
import questions from "./questionSlice";

const store = configureStore({
    reducer: {
        allUser: authen,
        currentUser: currentUser,
        questions: questions,
    },
});

export default store;
