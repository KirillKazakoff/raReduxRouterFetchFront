import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { updateForm } from '../redux/formSlice';
import { setEditted, setItems } from '../redux/serviceSlice';
import { setFormStatus, setTableStatus, Status } from '../redux/statusSlice';
import { AppThunk } from '../redux/store';

const baseUrl = 'http://localhost:9091';

function timeoutMock() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('ok'), 500);
    });
}

// type RequestType = (
//     req: () => Promise<Response>,
//     setStatus: ActionCreatorWithPayload<Status, string>
// ) => AppThunk<Promise<false | Response>>;

// const request: RequestType = (req, setStatus) => async (dispatch) => {
//     dispatch(setStatus('loading'));
//     await timeoutMock();
//     try {
//         const res = await req();
//         if (!res.ok) throw new Error('err');

//         dispatch(setStatus('loaded'));
//         return res;
//     } catch (e) {
//         dispatch(setStatus('failed'));
//         return false;
//     }
// };

type RequestType = (
    reqObj: {
        url: string;
        settings: RequestInit | undefined;
    },
    setStatus: ActionCreatorWithPayload<Status, string>
) => AppThunk<Promise<false | Response>>;

const request: RequestType = (reqObj, setStatus) => async (dispatch) => {
    dispatch(setStatus('loading'));
    await timeoutMock();

    const res = await fetch(`${baseUrl}/${reqObj.url}`, reqObj.settings);
    if (!res.ok) {
        dispatch(setStatus('failed'));
        return false;
    }

    dispatch(setStatus('loaded'));
    return res;
};

export const list = (): AppThunk => async (dispatch) => {
    const reqObj = { url: 'posts', settings: undefined };
    const res = await dispatch(request(reqObj, setTableStatus));

    if (!res) return;

    const resData = await res.json();
    dispatch(setItems(resData));
};

// export const list = (): AppThunk => async (dispatch) => {
//     dispatch(setTableStatus('loading'));

//     const res = await fetch(`${baseUrl}/posts`);
//     const resData = await res.json();

//     dispatch(setItems(resData));

//     dispatch(setTableStatus('loaded'));
// };

export const setFetched = (id: string): AppThunk => async (dispatch) => {
    dispatch(setFormStatus('loading'));

    const res = await fetch(`${baseUrl}/post/${id}`);
    const resData = await res.json();

    const { service, amount, desc } = resData;
    const itemFields = { service, amount, desc };

    dispatch(setEditted(resData));
    dispatch(updateForm(itemFields));

    dispatch(setFormStatus('loaded'));
};
