import { configureStore } from '@reduxjs/toolkit'
import { userReducers } from './userSlice.js';
import {quizzesReducers} from "./quizSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducers,
        quizzes: quizzesReducers
    }
});