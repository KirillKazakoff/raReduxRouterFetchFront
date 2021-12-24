import { Dispatch, SetStateAction } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';

export const initContent = [
    {
        service: 'Замена стекла',
        amount: '21000',
        id: '1',
    },
    {
        service: 'Замена дисплея',
        amount: '35000',
        id: '2',
    },
];

export type ContentType = typeof initContent[0];
export type SetPostType = Dispatch<SetStateAction<ContentType[]>>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
