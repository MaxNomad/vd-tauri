import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getKNSAlertsActive = createAsyncThunk('kns/getKnsAlertsActive', async (props) => {
    const response = await api.get(`/getSingleKNSAlertsActive?knsID=${props.id}&page=${props.page}&perPage=${props.perPage}`);
    return response.data;
});

export const knsAlertsActive = createSlice({
    name: 'knsAlertsActive',
    initialState: {
        data: {
            activeAlarmsListTotal: 0,
            activePage: 0,
            activePerPage: 0,
            activeAlarmsList: []
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getKNSAlertsActive.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getKNSAlertsActive.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getKNSAlertsActive.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default knsAlertsActive.reducer;
