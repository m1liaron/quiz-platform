import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {makeRequest} from "../utils/api.js";

export const createResult = createAsyncThunk(
    'result/create', async (quizData, thunkAPI) => {
        try {
            const response = await makeRequest("POST", `/result`, quizData);
            return response;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

export const getResult = createAsyncThunk(
    'result/get', async (id, thunkAPI) => {
        try {
            const response = await makeRequest("GET", `/result/${id}`);
            return response;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const initialState = {
    results: [],
    loading: false,
    error: null
}

const resultSlice = createSlice({
    name: 'results',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createResult.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createResult.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.results = action.payload
            })
            .addCase(createResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        // get result
            .addCase(getResult.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getResult.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.results = action.payload
            })
            .addCase(getResult.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const selectResults = (state) => state.results
export const resultReducers = resultSlice.reducer;