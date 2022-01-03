/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import Ul from '../primitives/Ul';

import Service from '../lib/Service';
import Loader from '../lib/Loader';
import { selectItems } from '../../redux/serviceSlice';
import { selectTableStatus } from '../../redux/statusSlice';

type TableProps = { list: any };

export default function TableR({ list }: TableProps) {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const status = useAppSelector(selectTableStatus);

    useEffect(() => {
        dispatch(list());
    }, []);

    const services = items.map((item) => (
        <Service key={item.id} item={item} remove={list.remove} />
    ));

    if (status !== 'loaded') {
        return <div>....Loading</div>;
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
