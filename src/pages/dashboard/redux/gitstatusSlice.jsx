import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getGitData = createAsyncThunk('root/getGithub', async () => {
    try {
        const response = await api.get(`/`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
});

export const rootGithub = createSlice({
    name: 'rootGithub',
    initialState: {
        data: {},
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
