import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const getFoundAlertList = createAsyncThunk('kns/getFoundAlertList', async (props) => {
    const response = await api.post(`/getFoundAlertList`, { tag: props.tag, date: props.date });
    return response.data;
});

export const knsFoundAlertList = createSlice({
    name: 'knsFoundAlertList',
    initialState: {
        reqListData: [],
        reqListLoading: 'idle',
        reqListError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getFoundAlertList.pending, (state, action) => {
            if (state.reqListLoading === 'idle') {
                state.reqListLoading = 'pending';
            }
        });
        builder.addCase(getFoundAlertList.fulfilled, (state, action) => {
            if (state.reqListLoading === 'pending') {
                state.reqListData = action.payload;
                state.reqListLoading = 'idle';
            }
        });
        builder.addCase(getFoundAlertList.rejected, (state, action) => {
            if (state.reqListLoading === 'pending') {
                state.reqListLoading = 'idle';
                state.reqListError = 'Error occured';
            }
        });
    }
});
export default knsFoundAlertList.reducer;
