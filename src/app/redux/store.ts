import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import serviceReducer from './serviceSlice';
import formReducer from './formSlice';

export const store = configureStore({
    reducer: {
        service: serviceReducer,
        inputs: formReducer,
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
