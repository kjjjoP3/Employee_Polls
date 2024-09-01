import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";

// Async thunk for fetching questions
export const getQuestions = createAsyncThunk("questions/getQuestions", async () => {
    const questions = await _getQuestions();
    return questions;
});

// Async thunk for saving a new question
export const saveQuestion = createAsyncThunk("questions/saveQuestion", async (newQuestion) => {
    const savedQuestion = await _saveQuestion(newQuestion);
    return savedQuestion;
});

// Async thunk for saving a user's answer to a question
export const saveQuestionAnswer = createAsyncThunk(
    "questions/saveQuestionAnswer",
    async ({ authedUser, qid, answer }) => {
        const result = await _saveQuestionAnswer({ authedUser, qid, answer });
        return result;
    }
);

// Slice for managing questions state
const questionSlice = createSlice({
    name: "questions",
    initialState: {
        value: {}, // Initial state for questions data
        status: null, // Status can be used for tracking loading/error states
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.value = action.payload; // Store fetched questions
            })
            .addCase(saveQuestion.fulfilled, (state, action) => {
                // Add newly saved question to the state
                const newQuestion = action.payload;
                state.value[newQuestion.id] = newQuestion;
            })
            .addCase(saveQuestionAnswer.fulfilled, (state, action) => {
                const { qid, answer, authedUser } = action.meta.arg;

                // Check if the question exists before trying to update
                if (state.value[qid]) {
                    state.value[qid][answer].votes.push(authedUser);
                }
            });
    },
});

export default questionSlice.reducer;
