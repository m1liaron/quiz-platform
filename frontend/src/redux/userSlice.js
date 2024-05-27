import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeRequest} from "../utils/api.js";

export const register = createAsyncThunk(
    'user/register', async (userData, thunkAPI) => {
        try {
            const response = await makeRequest("POST", '/auth/register', userData);
            await localStorage.setItem("token", JSON.stringify(response.token)); // save token to localstorage
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
            await localStorage.setItem("token", JSON.stringify(response.token)); // save token to localstorage
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
            });
    }
})

export const selectUser = (state) => state.user;

export const userReducers = userSlice.reducer;