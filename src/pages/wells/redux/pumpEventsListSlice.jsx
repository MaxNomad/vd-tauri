import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import { api } from '../../../api';

export const getPumpEventsList = createAsyncThunk('pump/getPumpEventsList', async (props) => {
    api.defaults.headers.Authorization = `Bearer ${getToken()}`;
    const response = await api.get(`/getWellEvents?pumpID=${props.id}&page=${props.page}&perPage=${props.perPage}`);
    return response.data;
});

export const pumpWellEvents = createSlice({
    name: 'getPumpEventsList',
    initialState: {
        data: {
            eventsTotal: 0,
            activePage: 0,
            activePerPage: 0,
            events: [],
        },
        loading: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPumpEventsList.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getPumpEventsList.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getPumpEventsList.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occured';
            }
        });
    }
});
export default pumpWellEvents.reducer;
