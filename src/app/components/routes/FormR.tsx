import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { refreshForm, selectInputs, updateForm } from '../../redux/formSlice';
import { useAppDispatch, useAppSelector } from '../../data/reduxHooks';
import useApi from '../../logic/useApi';

import Button from '../primitives/Button';
import { Flex } from '../primitives/Flex';
import Form from '../primitives/Form';
import MyInput from '../lib/MyInput';
import Loader from '../lib/Loader';
import SNavLink from '../primitives/NavLink';

export default function FormR() {
    const { api, editted, status } = useApi('');
    const dispatch = useAppDispatch();
    const inputs = useAppSelector(selectInputs);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!params.id) return;
        api.setItem(params.id).then((res) => {
            const { service, amount, desc } = res;
            const itemFields = { service, amount, desc };

            dispatch(updateForm(itemFields));
        });
    }, []);

    const onSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!editted) return;

        const result = { ...inputs, id: editted.id };
        const res = await api.edit(result);

        dispatch(refreshForm());
        if (res) navigate('/services');
    };

    if (status !== 'loaded') {
        return <Loader status={status} />;
    }

    return (
        <Form mb={4} onSubmit={onSubmit}>
            <Flex gap='10px' justifyContent='center' flexDirection='column'>
                <MyInput heading='Название' value={inputs.service} name='service' />
                <MyInput heading='Стоимость' value={inputs.amount} name='amount' />
                <MyInput heading='Описание' value={inputs.desc} name='desc' />
                <Flex gap='10px' mt={4}>
                    <Button variant='boxButton' bg='form' type='submit'>
                        Save
                    </Button>
                    <Button variant='boxButton' bg='cancel' type='button'>
                        <SNavLink to='/services'>Отмена</SNavLink>
                    </Button>
                </Flex>
            </Flex>
        </Form>
    );
}
