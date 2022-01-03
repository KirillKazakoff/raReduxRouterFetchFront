/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export type Status = 'idle' | 'loading' | 'loaded' | 'failed';

export type StatusState = {
    formStatus: Status;
    tableStatus: Status;
};

const initialState: StatusState = {
    formStatus: 'idle',
    tableStatus: 'idle',
};

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setFormStatus: (state, action: PayloadAction<Status>) => {
            state.formStatus = action.payload;
        },
        setTableStatus: (state, action: PayloadAction<Status>) => {
            state.tableStatus = action.payload;
        },
    },
});

export const { setFormStatus, setTableStatus } = statusSlice.actions;

export const selectFormStatus = (state: RootState) => state.statuses.formStatus;
export const selectTableStatus = (state: RootState) => state.statuses.tableStatus;

export default statusSlice.reducer;
