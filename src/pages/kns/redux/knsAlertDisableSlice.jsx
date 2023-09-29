import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../api';

export const deleteKNSAlert = createAsyncThunk('kns/deleteKNSAlert', async (props) => {
    const response = await api.delete(`/deleteDissableActiveAlert`, { tag: props.tag, date: props.date });
    return response.data;
});

export const knsAlertDisable = createSlice({
    name: 'knsAlertDisable',
    initialState: {
        reqData: {
            status: null
        },
        reqLoading: 'idle',
        reqError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(deleteKNSAlert.pending, (state, action) => {
            if (state.reqLoading === 'idle') {
                state.reqLoading = 'pending';
            }
        });
        builder.addCase(deleteKNSAlert.fulfilled, (state, action) => {
            if (state.reqLoading === 'pending') {
                state.reqData = action.payload;
                state.reqLoading = 'idle';
            }
        });
        builder.addCase(deleteKNSAlert.rejected, (state, action) => {
            if (state.reqLoading === 'pending') {
                state.reqLoading = 'idle';
                state.reqError = 'Error occured';
            }
        });
    }
});
export default knsAlertDisable.reducer;
