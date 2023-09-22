import { createSlice } from '@reduxjs/toolkit';

const dialogSlice = createSlice({
    name: 'dialog',
    initialState: {
        open: false,
        needUpdate: false
    },
    reducers: {
        openDialog: (state) => {
            state.open = true;
        },
        closeDialog: (state) => {
            state.open = false;
        },
        setNeedUpdate: (state) => {
            state.needUpdate = true;
        },
        setUpdated: (state) => {
            state.needUpdate = false;
        }
    }
});

export const { openDialog, closeDialog, setNeedUpdate, setUpdated } = dialogSlice.actions;
export default dialogSlice.reducer;
