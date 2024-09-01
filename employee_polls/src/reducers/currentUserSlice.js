import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
    name: "currentUser",
    initialState: {
        value: [],
    },
    reducers: {
        currentUser: (state, action) => {
            state.value = action.payload;
        },
        logout: (state) => {
            state.value = {}
        }
    },
});

export const { currentUser, logout } = currentUserSlice.actions;
export default currentUserSlice.reducer;
