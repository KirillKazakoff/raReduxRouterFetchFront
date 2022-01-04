import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ContentType } from '../data/initContent';
import { refreshForm, updateForm } from '../redux/formSlice';
import {
    editItem, removeItem, setEditted, setItems,
} from '../redux/serviceSlice';
import { setFormStatus, setTableStatus, Status } from '../redux/statusSlice';
import { AppThunk } from '../redux/store';

const baseUrl = 'http://localhost:9091';

function timeoutMock() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), 500);
    });
}

type RequestType = (
    reqObj: {
        url: string;
        settings: RequestInit | undefined;
    },
    setStatus: ActionCreatorWithPayload<Status, string>
) => AppThunk<Promise<false | Response>>;

const request: RequestType = (reqObj, setStatus) => async (dispatch) => {
    await timeoutMock();

    const res = await fetch(`${baseUrl}/${reqObj.url}`, reqObj.settings);
    if (!res.ok) {
        dispatch(setStatus('failed'));
        return false;
    }

    return res;
};

export const list = (): AppThunk => async (dispatch) => {
    dispatch(setTableStatus('loading'));

    const reqObj = { url: 'posts', settings: undefined };
    const res = await dispatch(request(reqObj, setTableStatus));

    if (!res) return;

    const resData = await res.json();
    dispatch(setItems(resData));

    dispatch(setTableStatus('loaded'));
};

export const setFetched = (id: string): AppThunk => async (dispatch) => {
    dispatch(setFormStatus('loading'));

    const reqObj = { url: `post/${id}`, settings: undefined };
    const res = await dispatch(request(reqObj, setFormStatus));

    if (!res) return;
    const resData = await res.json();

    const { service, amount, desc } = resData;
    const itemFields = { service, amount, desc };

    dispatch(setEditted(resData));
    dispatch(updateForm(itemFields));

    dispatch(setFormStatus('loaded'));
};

export const remove = (id: string): AppThunk => async (dispatch, getState) => {
    dispatch(setTableStatus('loading'));

    const { items } = getState().service;
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return;

    dispatch(removeItem(index));

    const reqObj = { url: `posts/${id}`, settings: { method: 'DELETE' } };
    const res = await dispatch(request(reqObj, setTableStatus));

    if (!res) return;
    dispatch(setTableStatus('loaded'));
};

type EditThunk = (post: ContentType) => AppThunk<Promise<false | true>>;
export const edit: EditThunk = (post) => async (dispatch) => {
    dispatch(setFormStatus('loading'));

    const reqObj = {
        url: 'posts',
        settings: {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        },
    };

    const res = await dispatch(request(reqObj, setFormStatus));
    if (!res) return false;

    dispatch(refreshForm());
    dispatch(editItem(post));

    dispatch(setFormStatus('loaded'));
    return true;
};
