import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getPnsRoot = createAsyncThunk('Pns/getPnsList', async () => {
    try {
        const response = await api.get(`/getRootPNS`);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
});

export const PnsRoot = createSlice({
    name: 'PnsRoot',
    initialState: {
        data: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPnsRoot.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPnsRoot.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
                state.error = null;
            }
        });
        builder.addCase(getPnsRoot.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.data = [];
                state.error = action.error;
            }
        });
    }
});
export default PnsRoot.reducer;
