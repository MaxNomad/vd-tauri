import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getRootGlobalData = createAsyncThunk('root/getGlobal', async () => {
    const response = await api.get(`/getRootGlobal`);
    return response.data;
});

export const rootGlobal = createSlice({
    name: 'rootGlobal',
    initialState: {
        data: {
            levels: {}
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRootGlobalData.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getRootGlobalData.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getRootGlobalData.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default rootGlobal.reducer;
