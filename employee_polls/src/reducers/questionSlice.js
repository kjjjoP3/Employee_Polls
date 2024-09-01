import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

export const getQuestions = createAsyncThunk("questions/getQuestions", async () => {
    const response = await _getQuestions();
    return response;
});

export const saveQuestion = createAsyncThunk("questions/saveQuestion", async (question) => {
    const response = await _saveQuestion(question);
    return response;
});

export const saveQuestionAnswer = createAsyncThunk(
    "questions/saveQuestionAnswer",
    async ({ authedUser, qid, answer }) => {
        const response = await _saveQuestionAnswer({ authedUser, qid, answer });
        return response;
    }
);

const questionSlice = createSlice({
    name: "questions",
    initialState: {
        value: {},
        status: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.value = action.payload;
            })
            .addCase(saveQuestion.fulfilled, (state, action) => {
                state.value[action.payload.id] = action.payload;
            })
            .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
                const { qid, answer, authedUser } = action.meta.arg;
                state.value[qid][answer].votes.push(authedUser);
            });
    },
});

export default questionSlice.reducer;
