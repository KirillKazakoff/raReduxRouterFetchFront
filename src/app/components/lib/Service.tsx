import React from 'react';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { Flex, Button, Text } from '../primitives/primitives';
import { ContentType } from '../../data/initContent';
import SNavLink from '../primitives/NavLink';
import { remove } from '../../logic/thunkApi';
import { useAppDispatch } from '../../data/reduxHooks';

type ServiceProps = { item: ContentType };

export default function Service({ item }: ServiceProps) {
    const dispatch = useAppDispatch();
    const onRemove = (e: React.SyntheticEvent) => dispatch(remove(e.currentTarget.id));

    return (
        <Flex key={item.id} gap='40px' alignItems='center'>
            <Flex gap='10px'>
                <Text>{item.service}</Text>
                <Text>{item.amount}</Text>
            </Flex>

            <Flex gap='10px'>
                <Button
                    variant='cancel' fontSize='18px' onClick={onRemove}
                    id={item.id}
                >
                    X
                </Button>
                <Button id={item.id}>
                    <SNavLink to={`/services/${item.id}`}>
                        <AiFillEdit />
                    </SNavLink>
                </Button>
            </Flex>
        </Flex>
    );
}
