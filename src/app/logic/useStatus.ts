import { useAppDispatch, useAppSelector } from '../data/reduxHooks';
import { setStatus } from '../redux/serviceSlice';

export default function useStatus() {
    const dispatch = useAppDispatch();
    const statuses = {
        tableStatus: useAppSelector((state) => state.service.status),
    };

    const setTable = (status: boolean) => {
        dispatch(setStatus(status));
    };

    const statusesApi = {
        setTable,
    };

    return { statusesApi, statuses };
}
