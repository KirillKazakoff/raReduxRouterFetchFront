import React from 'react';
import { Status } from '../../redux/statusSlice';
import { Text } from '../primitives/Text';

type LoaderProps = { status: Status };
export default function Loader({ status }: LoaderProps) {
    if (status === 'failed') return <Text>Error</Text>;
    return <Text>Loading...</Text>;
}
