import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import TodosReducer from "./slice"

export const store = configureStore({
    reducer: {
        todos: TodosReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;

export default store;