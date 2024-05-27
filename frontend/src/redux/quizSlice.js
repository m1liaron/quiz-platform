import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {makeRequest} from "../utils/api.js";

const createQuiz = createAsyncThunk(
    'quiz/create', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("POST", quizData, `/quiz/${quizData.id}`);
            return response.data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const updateQuiz = createAsyncThunk(
    'quiz/update', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("PUT", quizData, `/quiz/${quizData.id}`);
            return response.data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const deleteQuiz = createAsyncThunk(
    'quiz/delete', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("DELETE", quizData, `/quiz/${quizData.id}`);
            return response.data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const getQuiz = createAsyncThunk(
    'quiz/get', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("GET", quizData, `/quiz/${quizData.id}`);
            return response.data;
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
                const updatedQuizIndex = state.quizzes.findIndex(quiz => quiz.id === action.payload.id);
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
                state.quizzes = state.quizzes.filter(quiz => quiz._id !== action.payload.id);
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
            });
    }
})

// export const selectQuiz = (state) => state.quizzes.quizzes;
export const quizzesReducers = quizSlice.reducer;