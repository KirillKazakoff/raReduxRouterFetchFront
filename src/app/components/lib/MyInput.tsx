import React from 'react';
import { changeInput } from '../../redux/formSlice';
import { useAppDispatch } from '../../data/reduxHooks';
import Input, { InputProps } from '../primitives/Input';
import { Box } from '../primitives/Box';
import Heading from '../primitives/Heading';

type MyInputProps = InputProps & { heading: string };

export default function MyInput({ value, name, heading }: MyInputProps) {
    const dispatch = useAppDispatch();

    const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const changedInput = { name: e.currentTarget.name, value: e.currentTarget.value };
        dispatch(changeInput(changedInput));
    };

    return (
        <Box>
            <Heading mb={2}>{heading}</Heading>
            <Input
                name={name}
                variant='input'
                bg='form'
                required
                value={value}
                onChange={onChange}
                type='text'
            />
        </Box>
    );
}
