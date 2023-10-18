import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getRootPumpStation = createAsyncThunk('PumpStation/getRootPumpStation', async () => {
    try {
        const response = await api.get(`/getRootPumpStation`);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
});

export const PumpStation = createSlice({
    name: 'PumpStation',
    initialState: {
        data: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRootPumpStation.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getRootPumpStation.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
                state.error = null;
            }
        });
        builder.addCase(getRootPumpStation.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.data = [];
                state.error = action.error;
            }
        });
    }
});
export default PumpStation.reducer;
