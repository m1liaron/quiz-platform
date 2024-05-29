import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest} from "../utils/api.js";

export const createQuiz = createAsyncThunk(
    'quiz/create', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("POST", '/quiz', quizData);
            return response.data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const updateQuiz = createAsyncThunk(
    'quiz/update', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("PUT", `/quiz/${quizData.id}` );
            return response.data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const deleteQuiz = createAsyncThunk(
    'quiz/delete', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("DELETE",`/quiz/${quizData.id}`, quizData);
            return response;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const getQuiz = createAsyncThunk(
    'quiz/get', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("GET", `/quiz/${quizData.id}`, quizData);
            return response;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const getAllQuiz = createAsyncThunk(
    'quiz/getAll', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("GET", `/quiz`);
            return response;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const initialState = {
    quizzes: [],
    loading: false,
    error: null
}

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    extraReducers: (builder) => {
        builder
            // create quiz
            .addCase(createQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzes.pop(action.payload)
            })
            .addCase(createQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update Quiz
            .addCase(updateQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateQuiz.fulfilled, (state, action) => {
                state.loading = false;
                // Update the specific quiz in state with the updated data
                const updatedQuizIndex = state.quizzes.findIndex(quiz => quiz._id === action.payload.id);
                if (updatedQuizIndex !== -1){
                    state.quizzes[updatedQuizIndex] = action.payload;
                }
            })
            .addCase(updateQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // delete quiz
            .addCase(deleteQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteQuiz.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the deleted quiz from state
                state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload._id);
            })
            .addCase(deleteQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
           // get quiz
            .addCase(getQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzes = action.payload;
            })
            .addCase(getQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // all quizzes
            .addCase(getAllQuiz.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllQuiz.fulfilled, (state, action) => {
                state.loading = false;
                state.quizzes = action.payload;
            })
            .addCase(getAllQuiz.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const selectQuiz = (state) => state.quizzes;
export const quizzesReducers = quizSlice.reducer;