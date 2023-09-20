import { createSlice } from '@reduxjs/toolkit'
import { fetchUserData } from './authThunk';

const initialState = {
    error: null,
    loading: false,
    userData: {},
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUserData.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUserData.fulfilled]: (state, action) => {
            const user = action.payload;
            state.error = null;
            state.userData = user;
            state.loading = false;
        },
        [fetchUserData.rejected]: (state, action) => {
            state.loading = false;
            state.userData = {};
            state.error = action.error;
        },
    },
})




// eslint-disable-next-line no-empty-pattern
export const {} = userSlice.actions;

export default userSlice.reducer;