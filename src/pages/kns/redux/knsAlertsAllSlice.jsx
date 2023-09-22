import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getKNSAlertsAll = createAsyncThunk('kns/getKnsAlertsAll', async (props) => {
    const response = await api.get(`/getSingleKNSAlertsAll?knsID=${props.id}&page=${props.page}&perPage=${props.perPage}`);
    return response.data;
});

export const knsAlertsAll = createSlice({
    name: 'knsAlertsAll',
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
        builder.addCase(getKNSAlertsAll.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getKNSAlertsAll.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getKNSAlertsAll.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default knsAlertsAll.reducer;
