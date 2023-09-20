import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '@pages/authentication/helper/token';
import { api } from '../../../api';

export const getWellModbus = createAsyncThunk('pump/getPumpModbus', async (id) => {
    api.defaults.headers.Authorization = `Bearer ${getToken()}`;
    const response = await api.get(`/modbusOnline?pumpID=${id}`);
    return response.data;
});

export const wellModbus = createSlice({
    name: 'getPumpModbus',
    initialState: {
        data: { status: null },
        loading: 'idle',
        error: null,
        currentId: null // Track the current ID
    },
    reducers: {
        // Add a reducer to reset the state when id changes
        resetState: (state) => {
            state.data = { status: null };
            state.loading = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getWellModbus.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        });
        builder.addCase(getWellModbus.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                state.data = action.payload;
                state.loading = 'idle';
            }
        });
        builder.addCase(getWellModbus.rejected, (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle';
                state.error = 'Error occurred';
            }
        });
    }
});

export const { resetState } = wellModbus.actions; // Export the resetState action

export default wellModbus.reducer;
