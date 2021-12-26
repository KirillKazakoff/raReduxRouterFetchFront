/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
import { useState } from 'react';
import { ContentType } from '../data/initContent';
import { useAppSelector, useAppDispatch } from '../data/reduxHooks';
import {
    editItem,
    removeItem,
    selectEditted,
    selectItems,
    setEditted,
    setItems,
} from '../redux/serviceSlice';

export type Status = 'zero' | 'loading' | 'loaded' | 'failed';

export default function useApi(baseUrl: string | null) {
    const url = baseUrl || 'http://localhost:9091';
    const data = useAppSelector(selectItems);
    const editted = useAppSelector(selectEditted);
    const dispatch = useAppDispatch();

    const [status, setStatus] = useState<Status>('zero');

    const request = async (req: () => any) => {
        setStatus('loading');
        await timeoutMock();
        try {
            const res = await req();
            if (!res.ok) throw new Error('err');

            setStatus('loaded');
            return res;
        } catch (e) {
            setStatus('failed');
            return false;
        }
    };

    const list = async () => {
        const req = async () => fetch(`${url}/posts`);

        const res = await request(req);
        const resData = await res.json();

        dispatch(setItems(resData));
    };

    const setItem = async (id: string) => {
        const req = async () => fetch(`${url}/post/${id}`);

        const res = await request(req);
        const resData = await res.json();

        dispatch(setEditted(resData));
        return resData;
    };

    const remove = async (id: string) => {
        const req = async () => fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
        });

        const index = data.findIndex((item) => item.id === id);
        if (index === -1) return false;

        dispatch(removeItem(index));
        const res = await request(req);
        return res;
    };

    const edit = async (post: ContentType) => {
        const req = async () => fetch(`${url}/posts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });

        dispatch(editItem(post));

        const res = await request(req);
        return res;
    };

    const api = {
        list,
        setItem,
        edit,
        remove,
    };

    return {
        data,
        editted,
        status,
        api,
    };
}

function timeoutMock() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), 500);
    });
}

// const add = async (post: ContentType) => {
//     setStatus(true);
//     await fetch(`${url}/posts`, {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(post),
//     });

//     setData([...data, post]);
//     setStatus(false);
// };
