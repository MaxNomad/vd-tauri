import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {api}  from '../../../api';

export const getReport = createAsyncThunk('report/getReport', async (params) => {
    const response = await api.get('/get-report', { params });
    return response.data;
});

export const report = createSlice({
    name: 'report',
    initialState: {
        data:[],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getReport.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getReport.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getReport.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default report.reducer;
