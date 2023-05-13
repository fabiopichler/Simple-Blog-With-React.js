import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { authReducer, authSlice } from './auth/authSlice';
import { postsReducer, postsSlice } from './posts/postsSlice';

export const store = configureStore({
    reducer: {
        [authSlice.name]: authReducer,
        [postsSlice.name]: postsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
