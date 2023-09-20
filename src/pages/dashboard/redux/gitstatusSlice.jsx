import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import { api } from '../../../api';

export const getGitData = createAsyncThunk('root/getGithub', async () => {
    api.defaults.headers.Authorization = `Bearer ${getToken()}`;
    const response = await api.get(`/`);
    return response.data;
});

export const rootGithub = createSlice({
    name: 'rootGithub',
    initialState: {
        data: {
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGitData.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getGitData.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getGitData.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default rootGithub.reducer;
