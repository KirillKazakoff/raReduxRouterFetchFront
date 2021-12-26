import { Dispatch, SetStateAction } from 'react';

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

export type ContentType = typeof initContent[0] & { desc?: string };
export type SetPostType = Dispatch<SetStateAction<ContentType[]>>;
