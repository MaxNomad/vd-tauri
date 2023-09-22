import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import { api } from '../../../api';

export const getCountersRoot = createAsyncThunk('pump/getCountersRoot', async () => {
    const response = await api.get(`/getCountersGlobal`);
    return response.data;
});

export const CountersRoot = createSlice({
    name: 'CountersRoot',
    initialState: {
        data: [],
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCountersRoot.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getCountersRoot.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getCountersRoot.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default CountersRoot.reducer;
