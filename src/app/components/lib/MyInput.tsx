import React from 'react';
import { changeInput } from '../../redux/formSlice';
import { useAppDispatch } from '../../data/reduxHooks';
import Input, { InputProps } from '../primitives/Input';

export default function MyInput({ value, name }: InputProps) {
    const dispatch = useAppDispatch();

    const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const changedInput = { name: e.currentTarget.name, value: e.currentTarget.value };
        dispatch(changeInput(changedInput));
    };

    return (
        <Input
            name={name}
            variant='input'
            bg='form'
            required
            value={value}
            onChange={onChange}
            type='text'
        />
    );
}
