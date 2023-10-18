import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getKNSRoot = createAsyncThunk('kns/getKnsList', async () => {
    try {
        const response = await api.get(`/getRootKNS`);
        return response.data;
    } catch (e) {
        throw e.response.data;
    }
});

export const knsRoot = createSlice({
    name: 'knsRoot',
    initialState: {
        data: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getKNSRoot.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getKNSRoot.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
                state.error = null;
            }
        });
        builder.addCase(getKNSRoot.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.data = [];
                state.error = action.error;
            }
        });
    }
});
export default knsRoot.reducer;
