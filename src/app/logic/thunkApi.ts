import { ActionCreatorWithPayload, PayloadAction } from '@reduxjs/toolkit';
import { updateForm } from '../redux/formSlice';
import { setEditted, setItems } from '../redux/serviceSlice';
import { setFormStatus, setTableStatus, Status } from '../redux/statusSlice';
import { AppThunk } from '../redux/store';

const setterType = typeof setFormStatus;
const url = 'http://localhost:9091';

function timeoutMock() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), 500);
    });
}

type Request = {
    req: () => any;
    setStatus: ActionCreatorWithPayload<Status, string>;
} & AppThunk<string>;

const request: Request = (req, setStatus) => async (dispatch) => {
    dispatch(setStatus('loading'));
    await timeoutMock();
    try {
        const res = await req();
        if (!res.ok) throw new Error('err');

        setStatus('loaded');
        return res;
    } catch (e) {
        setStatus('failed');
        return false;
    }
};

// const request = async (
//     req: () => any,
//     setStatus: ActionCreatorWithPayload<Status, string>,
// ) => {
//     dispatch(setStatus('loading'));
//     await timeoutMock();
//     try {
//         const res = await req();
//         if (!res.ok) throw new Error('err');

//         setStatus('loaded');
//         return res;
//     } catch (e) {
//         setStatus('failed');
//         return false;
//     }
// };

export const list = (): AppThunk => async (dispatch) => {
    const req = async () => fetch(`${url}/posts`);

    const res = await request(req, setTableStatus);
    const resData = await res.json();

    dispatch(setItems(resData));
};

// export const list = (): AppThunk => async (dispatch) => {
//     dispatch(setTableStatus('loading'));

//     const res = await fetch(`${url}/posts`);
//     const resData = await res.json();

//     dispatch(setItems(resData));

//     dispatch(setTableStatus('loaded'));
// };

export const setFetched = (id: string): AppThunk => async (dispatch) => {
    dispatch(setFormStatus('loading'));

    const res = await fetch(`${url}/post/${id}`);
    const resData = await res.json();

    const { service, amount, desc } = resData;
    const itemFields = { service, amount, desc };

    dispatch(setEditted(resData));
    dispatch(updateForm(itemFields));

    dispatch(setFormStatus('loaded'));
};
