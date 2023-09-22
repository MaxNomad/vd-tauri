import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getChartData = createAsyncThunk('knsChartData', async (props) => {
    const response = await api.get(`/getKnsChart?knsID=${props.knsID}&timeline=${props.timeline}`);
    return response.data;
});

export const knsChartData = createSlice({
    name: 'knsChartData',
    initialState: {
        data: {
            date: [],
            level: [],
            alerts: [],
            m1Status: [],
            m2Status: [],
            m3Status: []
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getChartData.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getChartData.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getChartData.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default knsChartData.reducer;
