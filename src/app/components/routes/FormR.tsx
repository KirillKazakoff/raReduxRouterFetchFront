import React, { EffectCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    changeInput,
    refreshForm,
    selectInputs,
    updateForm,
} from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
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
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const unmountFunc = () => {
            isMounted = false;
        };

        if (!isMounted || !params.id) return unmountFunc;

        api.setItem(params.id).then((res) => {
            const itemFields = { service: res.service, amount: res.amount };
            dispatch(updateForm(itemFields));
        });

        return unmountFunc;
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

        api.edit(result);
        navigate('/services');
    };

    if (isQuerying) return <div>Loading...</div>;
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
