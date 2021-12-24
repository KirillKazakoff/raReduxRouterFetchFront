import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    changeInput,
    refreshForm,
    selectInputs,
    updateForm,
} from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import { editItem, selectEditted } from '../../redux/serviceSlice';
import useApi from '../../logic/useApi';

import Button from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import Form from '../primitives/Form';
import Input from '../primitives/Input';

export default function FormR() {
    const { api, editted, isQuerying } = useApi('');
    const dispatch = useAppDispatch();
    const inputs = useAppSelector(selectInputs);

    const params = useParams();

    useEffect(() => {
        if (!params.id) return;

        api.setItem(params.id).then((res) => {
            const itemFields = { service: res.service, amount: res.amount };
            dispatch(updateForm(itemFields));
        });
    }, []);

    const onChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const changedInput = { name: e.currentTarget.name, value: e.currentTarget.value };
        dispatch(changeInput(changedInput));
    };

    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!editted) return;

        const result = { ...inputs, id: editted.id };
        dispatch(refreshForm());

        dispatch(editItem(result));
    };

    // const itemFields = { service: editted.service, amount: editted.amount };
    // dispatch(updateForm(itemFields));
    if (!editted) return <div>Loading...</div>;
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
