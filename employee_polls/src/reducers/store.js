import { configureStore } from "@reduxjs/toolkit";
import authen from "./authenSlice";
import user from "./currentUserSlice";
import question from "./questionSlice";
 

const store = configureStore({
    reducer: {
        allUser: authen,
        createQuestion: authen,
        logout: user,
        currentUser: user,
        questions: question
    },
});

export default store;