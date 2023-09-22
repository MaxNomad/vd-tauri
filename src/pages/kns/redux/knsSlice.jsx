import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getKNS = createAsyncThunk('kns/getKns', async (id) => {
    const response = await api.get(`/getSingleKNS?knsID=${id}`);
    return response.data;
});

export const kns = createSlice({
    name: 'kns',
    initialState: {
        data: {
            pumps: [],
            grids: [],
            alarmsList: [],
            alarmsActive: []
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getKNS.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getKNS.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getKNS.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default kns.reducer;
