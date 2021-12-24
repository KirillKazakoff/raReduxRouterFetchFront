/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initContent, ContentType } from '../data/initContent';
import type { AppThunk, RootState } from './store';

export interface ServiceState {
    items: ContentType[];
    // editted: string;
    editted: ContentType | null;
    filter: string;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ServiceState = {
    items: initContent,
    // editted: '',
    editted: null,
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
        // setEditted: (state, action: PayloadAction<string>) => {
        //     state.editted = action.payload;
        // },
        setEditted: (state, action: PayloadAction<ContentType>) => {
            state.editted = action.payload;
        },
        editItem: (state, action: PayloadAction<ContentType>) => {
            const index = findIndex(state.items, action.payload.id);
            state.items[index] = action.payload;
        },
    },
});

export const { addItem, removeItem, setEditted, setItems, editItem } = serviceSlice.actions;

export const selectItems = (state: RootState) => {
    return state.service.items.filter((item) => item.service.includes(state.service.filter));
};
export const selectEditted = (state: RootState) => state.service.editted;

// export const editItem = (item: ContentType): AppThunk => (dispatch) => {
//     dispatch(serviceSlice.actions.editItem(item));
//     dispatch(setEditted(''));
// };

export default serviceSlice.reducer;
