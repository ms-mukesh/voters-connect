import { configureStore } from '@reduxjs/toolkit';

import TodoSlice from './reducers/todo/TodoSlice';
import TypoGraphySlice from '@/src/lib/reduxToolkit/reducers/typoGraphy/TypoGraphySlice';

const store = configureStore({
    // Place your reducer inside this reducer object.
    reducer: {
        todo: TodoSlice,
        typoGraphy: TypoGraphySlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: { counter: CounterSlice }
export type AppDispatch = typeof store.dispatch;

export default store;
