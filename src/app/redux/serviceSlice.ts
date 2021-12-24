/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initContent, ContentType } from '../data/initContent';
import type { AppThunk, RootState } from './store';

export interface ServiceState {
    items: ContentType[];
    editted: string;
    filter: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ServiceState = {
    items: initContent,
    editted: '',
    filter: '',
    status: 'idle',
};

const findIndex = (items: ContentType[], id: string) => {
    return items.findIndex((item) => item.id === id);
};

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<ContentType[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<ContentType>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1);
        },
        setEditted: (state, action: PayloadAction<string>) => {
            state.editted = action.payload;
        },
        editItem: (state, action: PayloadAction<ContentType>) => {
            const index = findIndex(state.items, action.payload.id);
            state.items[index] = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
    },
});

export const { addItem, removeItem, setEditted, setFilter, setItems } = serviceSlice.actions;

export const selectItems = (state: RootState) => {
    return state.service.items.filter((item) => item.service.includes(state.service.filter));
};
export const selectEditted = (state: RootState) => state.service.editted;

export const editItem = (item: ContentType): AppThunk => (dispatch) => {
    dispatch(serviceSlice.actions.editItem(item));
    dispatch(setEditted(''));
};

export default serviceSlice.reducer;

// class Reducer {
//     state: ServiceState;

//     constructor(state: ServiceState) {
//         this.state = state;
//     }

//     addItem(action: PayloadAction<ContentType>) {
//         this.state.items.push(action.payload);
//     }

//     removeItem(action: PayloadAction<string>) {
//         const index = this.state.items.findIndex((item) => item.id === action.payload);
//         this.state.items.splice(index, 1);
//     }
//     editItem: (state: ServiceState, action: PayloadAction<ContentType>) => {

//     }
// }
