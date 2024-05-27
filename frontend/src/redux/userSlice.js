import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {makeRequest} from "../utils/api.js";

const register = createAsyncThunk(
    'user/register', async (userData, thunkAPI) => {
        try {
            const response = await makeRequest("POST", userData, '/register');
            localStorage.setItem("token", JSON.stringify(response.data.token)); // save token to localstorage
            return response.data
        } catch (error){
            return thunkAPI.rejectWithValue(error.message); // Return error message
        }
    }
)

const login = createAsyncThunk(
    'user/login', async (userData, thunkAPI) => {
        try{
            const response = await makeRequest("POST", userData, '/login');
            localStorage.setItem("token", JSON.stringify(response.data.token)); // save token to localstorage
            return response.data
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
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const selectUser = (state) => state.user.user;

export const userReducers = userSlice.reducer;