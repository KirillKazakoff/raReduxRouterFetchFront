import { useState } from 'react';
import { ContentType, useAppDispatch } from '../data/initContent';

export default function useApi(baseUrl: string | null) {
    const url = baseUrl || 'http://localhost:9091';

    const [data, setData] = useState<ContentType[]>([]);
    const [isQuerying, setIsQuerying] = useState(false);

    const list = async () => {
        setIsQuerying(true);
        const res = await fetch(`${url}/posts`);
        const resData = await res.json();

        setData([...resData]);
        setIsQuerying(false);
    };

    const add = async (post: ContentType) => {
        setIsQuerying(true);
        await fetch(`${url}/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });

        setData([...data, post]);
        setIsQuerying(false);
    };

    const edit = async (post: ContentType) => {
        const copy = [...data];
        const index = copy.findIndex((item) => item.id === post.id);
        copy.splice(index, 1);

        setData(copy);
        await add(post);
    };

    const remove = async (id: string) => {
        setIsQuerying(true);
        await fetch(`${url}/posts/${id}`, {
            method: 'DELETE',
        });

        const copy = [...data];
        const index = copy.findIndex((item) => item.id === id);
        copy.splice(index, 1);

        setData(copy);
        setIsQuerying(false);
    };

    const api = {
        list,
        add,
        edit,
        remove,
    };

    return { data, isQuerying, api };
}
