import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { api } from '../../services/api';
import { useAppSelector } from '../hooks';
import { IPostsState } from './IPostsState';

const name = 'posts';

const initialState: IPostsState = {
    lastPosts: [],
};

export const fetchLastPosts = createAsyncThunk(
    `${name}/fetchLastPosts`,
    async () => {
        const { data } = await api.get('/posts/last');

        return data;
    }
);

export const postsSlice = createSlice({
    name,
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            // fetchLastPosts
            .addCase(fetchLastPosts.fulfilled, (state, action) => {
                state.lastPosts = action.payload ?? [];
            });
    },
});

export const { } = postsSlice.actions;

export const usePosts = () => useAppSelector(state => state[postsSlice.name]);

export const postsReducer = postsSlice.reducer;
