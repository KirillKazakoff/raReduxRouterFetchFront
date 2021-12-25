/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { InputState, initForm } from '../data/initForm';

export interface InputsState {
    [key: string]: string;
    service: string;
    amount: string;
    desc: string;
}

export const formSlice = createSlice({
    name: 'input',
    initialState: initForm,
    reducers: {
        changeInput: (state: InputsState, action: PayloadAction<InputState>) => {
            state[action.payload.name] = action.payload.value;
        },
        updateForm: (state, action: PayloadAction<InputsState>) => action.payload,
        refreshForm: () => initForm,
    },
});

export const { changeInput, updateForm, refreshForm } = formSlice.actions;

export const selectInputs = (state: RootState) => state.inputs;

export default formSlice.reducer;
