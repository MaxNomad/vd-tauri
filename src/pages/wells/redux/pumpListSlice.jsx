import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getPumpRoot = createAsyncThunk('pump/getPumpList', async () => {
    const response = await api.get(`/getRootPumps`);
    return response.data;
});

export const PumpRoot = createSlice({
    name: 'PumpRoot',
    initialState: {
        data: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPumpRoot.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPumpRoot.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getPumpRoot.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default PumpRoot.reducer;
