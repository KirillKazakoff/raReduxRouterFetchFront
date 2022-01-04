/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import Ul from '../primitives/Ul';

import Service from '../lib/Service';
import Loader from '../lib/Loader';
import { selectItems } from '../../redux/serviceSlice';
import { selectTableStatus } from '../../redux/statusSlice';
import { list } from '../../logic/thunkApi';

export default function TableR() {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const status = useAppSelector(selectTableStatus);

    useEffect(() => {
        if (status !== 'idle') return;

        dispatch(list());
    }, []);

    const services = items.map((item) => <Service key={item.id} item={item} />);

    if (status !== 'loaded') {
        return <Loader status={status} />;
    }

    return (
        <Ul
            bg='tomato' flexDirection='column' variant='primary'
            rowGap='10px'
        >
            {services}
        </Ul>
    );
}
