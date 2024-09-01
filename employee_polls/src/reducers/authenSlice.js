import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../utils/_DATA";

export const getUsers = createAsyncThunk("authen/getUsers", async () => {
    try {
        const response = await _getUsers();
        return response;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
});

const authenSlice = createSlice({
    name: "allUser",
    initialState: {
        value: {},
        status: 'idle',  // added a status for better state management
        error: null,     // added error handling
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default authenSlice.reducer;
