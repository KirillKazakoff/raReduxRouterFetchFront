import React from 'react';
import { AiFillEdit } from '@react-icons/all-files/ai/AiFillEdit';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import { Flex, Button, Text } from '../primitives/primitives';
import { ContentType } from '../../data/initContent';
import { removeItem } from '../../redux/serviceSlice';

type ServiceProps = { item: ContentType; remove: (id: string) => void };

export default function Service({ item, remove }: ServiceProps) {
    const dispatch = useAppDispatch();

    const onRemove = (e: React.SyntheticEvent) => {
        const { id } = e.currentTarget;
        remove(id);
    };

    const onEdit = (e: React.SyntheticEvent) => {
        console.log('hello');
    };

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
                <Button onClick={onEdit} id={item.id}>
                    <AiFillEdit />
                </Button>
            </Flex>
        </Flex>
    );
}
