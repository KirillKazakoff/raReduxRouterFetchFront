/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { updateForm } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import { removeItem, setEditted, selectEditted } from '../../redux/serviceSlice';
import useApi from '../../logic/useApi';

import { Flex } from '../primitives/Flex';
import { Text } from '../primitives/Text';
import Ul from '../primitives/Ul';
import Button from '../primitives/Button';
import Service from '../lib/Service';

export default function TableR() {
    const { api, data: items, isQuerying } = useApi('');
    useEffect(() => {
        api.list();
    }, []);
    // const items = useAppSelector(selectItems);
    const dispatch = useAppDispatch();
    const isEditted = useAppSelector(selectEditted);
    const services = items.map((item) => (
        <Service key={item.id} item={item} remove={api.remove} />
    ));

    if (isQuerying) return <div>Loading ...</div>;
    return (
        <Ul
            bg='tomato'
            flexDirection='column'
            variant='primary'
            rowGap='10px'
            borderColor={isEditted ? 'formChanged' : 'primary'}
        >
            {services}
        </Ul>
    );
}
