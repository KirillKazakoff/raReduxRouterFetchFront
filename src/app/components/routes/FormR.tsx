import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { refreshForm, selectInputs, updateForm } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import useApi from '../../logic/useApi';

import Button from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import Form from '../primitives/Form';
import MyInput from '../lib/MyInput';

export default function FormR() {
    const { api, editted, isQuerying } = useApi('');
    const dispatch = useAppDispatch();
    const inputs = useAppSelector(selectInputs);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.id) return;
        api.setItem(params.id).then((res) => {
            const itemFields = {
                service: res.service,
                amount: res.amount,
                desc: res.desc,
            };
            dispatch(updateForm(itemFields));
        });
    }, []);

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!editted) return;

        const result = { ...inputs, id: editted.id };
        dispatch(refreshForm());

        await api.edit(result);
        navigate('/services');
    };

    if (!isQuerying) {
        return <div>Loading...</div>;
    }

    return (
        <Form mb={4} onSubmit={onSubmit}>
            <Flex gap='10px' justifyContent='center' flexDirection='column'>
                <MyInput heading='Название' value={inputs.service} name='service' />
                <MyInput heading='Стоимость' value={inputs.amount} name='amount' />
                <MyInput heading='Описание' value={inputs.desc} name='desc' />
                <Button variant='boxButton' bg='form' type='submit'>
                    Save
                </Button>
            </Flex>
        </Form>
    );
}
