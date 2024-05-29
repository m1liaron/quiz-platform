import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeRequest} from "../utils/api.js";
import {deleteQuiz} from "./quizSlice.js";

export const register = createAsyncThunk(
    'user/register', async (userData, thunkAPI) => {
        try {
            const response = await makeRequest("POST", '/auth/register', userData);
            return response.user
        } catch (error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const login = createAsyncThunk(
    'user/login', async (userData, thunkAPI) => {
        try{
            const response = await makeRequest("POST", '/auth/login', userData);
            return response.user
        } catch (error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const getUser = createAsyncThunk(
    'user/get', async (thunkAPI) => {
        try{
            const response = await makeRequest("GET", '/user');
            return response.user
        } catch (error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/update', async (data, thunkAPI) => {
        try{
            console.log(data)
            const response = await makeRequest("PUT", '/user', data);
            return response.user
        } catch (error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const initialState = {
    user:null,
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder
            // register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Get user
            .addCase(getUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // delete quiz from own_quizzes
            .addCase(deleteQuiz.fulfilled, (state, action) => {
                if (state.user) {
                    state.user.own_quizzes = state.user.own_quizzes.filter(
                        quiz => quiz.quizId !== action.meta.arg.id
                    );
                }
            })
    }
})

export const selectUser = (state) => state.user;

export const userReducers = userSlice.reducer;