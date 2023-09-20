import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import { api } from '../../../api';

export const getPumpAlertsAll = createAsyncThunk('pump/getPumpAlertsAll', async (props) => {
    api.defaults.headers.Authorization = `Bearer ${getToken()}`;
    const response = await api.get(`/getSinglePumpAlertsAll?pumpID=${props.id}&page=${props.page}&perPage=${props.perPage}`);
    return response.data;
});

export const pumpAlertsAll = createSlice({
    name: 'pumpAlertsAll',
    initialState: {
        data: {
            allAlarmsListTotal: 0,
            allPage: 0,
            allPerPage: 0,
            allAlarmsList: []
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPumpAlertsAll.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPumpAlertsAll.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getPumpAlertsAll.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default pumpAlertsAll.reducer;
