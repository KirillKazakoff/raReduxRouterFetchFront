import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice';
import statusReducer from './statusSlice';
import formReducer from './formSlice';

export const store = configureStore({
    reducer: {
        service: serviceReducer,
        inputs: formReducer,
        statuses: statusReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
