import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getPUMP = createAsyncThunk('pump/getPump', async (id) => {
    try {
        const response = await api.get(`/getSinglePump?pumpID=${id}`);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
});

export const pump = createSlice({
    name: 'pump',
    initialState: {
        data: {},
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPUMP.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPUMP.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
                state.error = null;
            }
        });
        builder.addCase(getPUMP.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.data = [];
                state.error = action.error;
            }
        });
    }
});
export default pump.reducer;
