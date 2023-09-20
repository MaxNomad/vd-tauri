import { createSlice } from '@reduxjs/toolkit';
import { login, signOut, loginGoogle } from './authThunk';
import React from 'react';

const initialState = {
    access_token: null,
    refresh_token: null,
    error: null,
    loading: false,
    signOut: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [signOut.fulfilled]: (state, action) => {
            state.loading = false;
            state.userData = {};
            state.error = null;
            state.access_token = null;
            state.refresh_token = null;
            state.signOut = true;
        },
        [login.pending]: (state, action) => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            const { access_token, refresh_token } = action.payload;
            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.loading = false;
            state.error = null;
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.access_token = null;
            state.refresh_token = null;
        },
        [loginGoogle.pending]: (state, action) => {
            state.loading = true;
        },
        [loginGoogle.fulfilled]: (state, action) => {
            const { access_token, refresh_token } = action.payload;
            state.access_token = access_token;
            state.refresh_token = refresh_token;
            state.loading = false;
            state.error = null;
        },
        [loginGoogle.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.access_token = null;
            state.refresh_token = null;
        }
    }
});

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;

export default authSlice.reducer;
