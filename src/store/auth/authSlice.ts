import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ICredentials } from '../../interfaces/ICredentials';
import { api } from '../../services/api';
import { getJwtToken, removeJwtToken, setJwtToken } from '../../services/authStorageApi';
import { useAppSelector } from '../hooks';
import { AuthLoginStatus } from './AuthLoginStatus';
import { IAuthState } from './IAuthState';

const name = 'auth';

const initialState: IAuthState = {
    loading: true,
    isLogged: false,
    user: null,
    loginStatus: AuthLoginStatus.Nothing,
    logoutStatus: AuthLoginStatus.Nothing,
};

export const initAuth = createAsyncThunk(
    `${name}/init`,
    async () => {
        if (!getJwtToken())
            return null;

        const { data } = await api.get('/auth/user');

        return data;
    }
);

export const loginAuth = createAsyncThunk(
    `${name}/login`,
    async (credentials: ICredentials) => {
        const { data } = await api.post('/auth/signin', credentials);

        setJwtToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });

        return data.user;
    }
);

export const logoutAuth = createAsyncThunk(
    `${name}/logout`,
    async () => {
        const token = getJwtToken();

        try {
            await api.post('/auth/signout', { refreshToken: token?.refreshToken });
        } catch (error) { }

        removeJwtToken();
    }
);

export const authSlice = createSlice({
    name,
    initialState,
    reducers: {
        resetAuthLoginStatus: (state) => {
            state.loginStatus = AuthLoginStatus.Nothing;
        },

        resetAuthLogoutStatus: (state) => {
            state.logoutStatus = AuthLoginStatus.Nothing;
        },
    },
    extraReducers: builder => {
        builder
            // initAuth
            .addCase(initAuth.pending, (state) => {
                //state.loading = true;
            })
            .addCase(initAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isLogged = !!action.payload;
                state.user = action.payload;
            })
            .addCase(initAuth.rejected, (state) => {
                state.loading = false;
                state.isLogged = false;
            })

            // loginAuth
            .addCase(loginAuth.pending, (state) => {
                state.loginStatus = AuthLoginStatus.Loading;
            })
            .addCase(loginAuth.fulfilled, (state, action) => {
                state.loginStatus = AuthLoginStatus.Success;

                state.isLogged = !!action.payload;
                state.user = action.payload;
            })
            .addCase(loginAuth.rejected, (state) => {
                state.loginStatus = AuthLoginStatus.Error;
            })

            // logoutAuth
            .addCase(logoutAuth.pending, (state) => {
                state.logoutStatus = AuthLoginStatus.Loading;
            })
            .addCase(logoutAuth.fulfilled, (state, action) => {
                state.logoutStatus = AuthLoginStatus.Success;

                state.loading = false;
                state.isLogged = false;
                state.user = null;
            })
            .addCase(logoutAuth.rejected, (state) => {
                state.logoutStatus = AuthLoginStatus.Error;
            });
    },
});

export const { resetAuthLoginStatus, resetAuthLogoutStatus } = authSlice.actions;

export const useAuth = () => useAppSelector(state => state[authSlice.name]);

export const authReducer = authSlice.reducer;
