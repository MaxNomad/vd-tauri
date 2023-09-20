import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import api from '../../../api';


export const getPUMP = createAsyncThunk('pump/getPump', async (id) => {
    api.defaults.headers.Authorization = `Bearer ${getToken()}`;
    const response = await api.get(`/getSinglePump?pumpID=${id}`);
    return response.data;
});

export const pump = createSlice({
    name: 'pump',
    initialState: {
        data: {
        },
        pumps: [],
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
            }
        });
        builder.addCase(getPUMP.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default pump.reducer;
