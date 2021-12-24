import React from 'react';
import { nanoid } from 'nanoid';
import { changeInput, refreshForm, selectInputs } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../data/initContent';
import Button from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import Form from '../primitives/Form';
import Input from '../primitives/Input';
import { addItem, editItem, selectEditted } from '../../redux/serviceSlice';

export default function MyForm() {
    const dispatch = useAppDispatch();
    const editId = useAppSelector(selectEditted);
    const inputs = useAppSelector(selectInputs);

    const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const changedInput = { name: e.currentTarget.name, value: e.currentTarget.value };
        dispatch(changeInput(changedInput));
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const newService = { ...inputs, id: nanoid() };
        dispatch(refreshForm());
        if (editId) {
            newService.id = editId;
            dispatch(editItem(newService));
            return;
        }

        dispatch(addItem(newService));
    };

    return (
        <Form mb={4} onSubmit={onSubmit}>
            <Flex gap='10px' justifyContent='center'>
                <Input
                    name='service'
                    variant='input'
                    bg='form'
                    required
                    value={inputs.service}
                    onChange={onChange}
                />
                <Input
                    name='amount'
                    variant='input'
                    bg='form'
                    required
                    value={inputs.amount}
                    onChange={onChange}
                    type='text'
                />
                <Button variant='boxButton' bg='form' type='submit'>
                    Save
                </Button>
            </Flex>
        </Form>
    );
}
