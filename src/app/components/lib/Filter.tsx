import React from 'react';
import { setFilter } from '../../redux/serviceSlice';
import { Flex } from '../primitives/Flex';
import Input from '../primitives/Input';
import { Text } from '../primitives/Text';

import { useAppDispatch, useAppSelector } from '../../data/initContent';

export default function Filter() {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.service.filter);

    const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        dispatch(setFilter(e.currentTarget.value));
    };

    return (
        <Flex
            width={1 / 2}
            mx='auto'
            justifyContent='center'
            mt={4}
            gap='15px'
            alignItems='center'
        >
            <Text>Input filter here</Text>
            <Input
                name='filter'
                variant='input'
                bg='form'
                onChange={onChange}
                value={filter}
            />
        </Flex>
    );
}
