import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getPnsRoot = createAsyncThunk('Pns/getPnsList', async () => {
    const response = await api.get(`/getRootPNS`);
    return response.data;
});

export const PnsRoot = createSlice({
    name: 'PnsRoot',
    initialState: {
        data: [],
        pumps: [],
        loading: 'idle',
        empty: true,
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
                state.empty = action.payload.length > 0 ? false : true;
                state.loading = 'idle';
            }
        });
        builder.addCase(getPnsRoot.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default PnsRoot.reducer;
