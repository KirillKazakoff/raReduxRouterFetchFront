/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useApi from '../../logic/useApi';
import Ul from '../primitives/Ul';

import Service from '../lib/Service';
import useStatus from '../../logic/useStatus';

export default function TableR() {
    const { statuses, statusesApi } = useStatus();
    const { api, data: items, isQuerying } = useApi('');

    useEffect(() => {
        api.list();
    }, []);

    const services = items.map((item) => (
        <Service key={item.id} item={item} remove={api.remove} />
    ));

    if (!isQuerying) {
        console.log(isQuerying);
        return <div>Loading ...</div>;
    }
    console.log(isQuerying);
    return (
        <Ul
            bg='tomato' flexDirection='column' variant='primary'
            rowGap='10px'
        >
            {services}
        </Ul>
    );
}
