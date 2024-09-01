import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../utils/_DATA";

export const getUsers = createAsyncThunk("authen/getUsers", async () => {
    const response = await _getUsers();
    return response;
});

const authenSlice = createSlice({
    name: "allUser",
    initialState: {
        value: {},
        status: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.value = action.payload;
        });
    },
});

export default authenSlice.reducer;
