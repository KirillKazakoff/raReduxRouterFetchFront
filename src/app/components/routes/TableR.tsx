/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useApi from '../../logic/useApi';
import Ul from '../primitives/Ul';

import Service from '../lib/Service';
import Loader from '../lib/Loader';

export default function TableR() {
    const { api, data, status } = useApi('');

    useEffect(() => {
        api.list();
    }, []);

    const services = data.map((item) => (
        <Service key={item.id} item={item} remove={api.remove} />
    ));

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
