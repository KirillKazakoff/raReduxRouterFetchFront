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

    const request = async (callback: () => any) => {
        setStatus('loading');
        try {
            const res = await callback();
            setStatus('loaded');
            return res;
        } catch (e) {
            setStatus('failed');
            return false;
        }
    };

    const request2 = async (req: () => any) => {
        setStatus('loading');
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
        const callback = async () => {
            // await timeoutMock();
            const res = await fetch(`${url}/posts`);
            const resData = await res.json();
            console.log(resData.ok);

            dispatch(setItems(resData));
        };

        await request(callback);
    };

    const setItem = async (id: string) => {
        const callback = async () => {
            const res = await fetch(`${url}/post/${id}`);
            const resData = await res.json();

            dispatch(setEditted(resData));
            return resData;
        };

        const res = await request(callback);
        return res;
    };

    const remove = async (id: string) => {
        const callback = async () => {
            await fetch(`${url}/posts/${id}`, {
                method: 'DELETE',
            });

            const index = data.findIndex((item) => item.id === id);
            if (index === -1) return;

            dispatch(removeItem(index));
        };

        await request(callback);
    };

    const edit = async (post: ContentType) => {
        const callback = async () => {
            dispatch(editItem(post));

            await timeoutMock();
            const res = await fetch(`${url}/poss`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post),
            });
            if (!res.ok) throw new Error('errror!');
        };

        await request(callback);
        return true;
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
        setTimeout(() => resolve('ok'), 1000);
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
