import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import { api } from '../../../api';

export const getPumpAlertsActive = createAsyncThunk('pump/getPumpAlertsActive', async (props) => {
    api.defaults.headers.Authorization = `Bearer ${getToken()}`;
    const response = await api.get(`/getSinglePumpAlertsActive?pumpID=${props.id}&page=${props.page}&perPage=${props.perPage}`);
    return response.data;
});

export const pumpAlertsActive = createSlice({
    name: 'pumpAlertsActive',
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
        builder.addCase(getPumpAlertsActive.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPumpAlertsActive.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getPumpAlertsActive.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default pumpAlertsActive.reducer;
