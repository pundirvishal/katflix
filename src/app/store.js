import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import { setupListeners } from '@reduxjs/toolkit/query';
import store from "./store";
import { genreOrCategory } from "../features/currentGenreOrCategory";
import authUserReducer from '../features/auth';

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategory.reducer,
        currentUser: authUserReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tmdbApi.middleware),
})

setupListeners(store.dispatch);