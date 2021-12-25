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

// type Status = 'idle' | 'loading' | 'failed';

export default function useApi(baseUrl: string | null) {
    const url = baseUrl || 'http://localhost:9091';
    const data = useAppSelector(selectItems);
    const editted = useAppSelector(selectEditted);
    const dispatch = useAppDispatch();

    const [isQuerying, setIsQuerying] = useState<boolean>(false);

    const list = async () => {
        await timeoutMock();

        setIsQuerying(false);
        const res = await fetch(`${url}/posts`);
        const resData = await res.json();

        dispatch(setItems(resData));
        setIsQuerying(true);
    };

    const setItem = async (id: string) => {
        setIsQuerying(false);
        const res = await fetch(`${url}/post/${id}`);
        const resData = await res.json();

        dispatch(setEditted(resData));
        setIsQuerying(true);
        return resData;
    };

    const remove = async (id: string) => {
        setIsQuerying(false);
        await fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
        });

        const index = data.findIndex((item) => item.id === id);
        if (index === -1) return;

        dispatch(removeItem(index));
        setIsQuerying(true);
    };

    const edit = async (post: ContentType) => {
        setIsQuerying(false);
        dispatch(editItem(post));

        await timeoutMock();
        await fetch(`${url}/posts`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        setIsQuerying(true);
    };

    // const add = async (post: ContentType) => {
    //     setIsQuerying(true);
    //     await fetch(`${url}/posts`, {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(post),
    //     });

    //     setData([...data, post]);
    //     setIsQuerying(false);
    // };

    const api = {
        list,
        setItem,
        edit,
        remove,
    };

    return {
        data,
        editted,
        isQuerying,
        api,
    };
}

function timeoutMock() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), 1000);
    });
}
