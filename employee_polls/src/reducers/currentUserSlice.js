import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        currentUser: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = [];
        },
    },
});

export const { currentUser, logout } = currentUserSlice.actions;
export default currentUserSlice.reducer;
