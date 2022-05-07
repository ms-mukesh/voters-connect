/**
 * This TodoSlice reducer is a demo implementation of redux with middleware redux-thunk using @redux/toolkit.
 * If you want, you can remove the code from this file or put it as a reference.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoData } from '@/src/types/redux/todo';

import { RootState } from '@/src/lib/reduxToolkit/store';

const initialState: TodoData = {
    todoList: [],
    loading: false,
};
// `createSlice` will infer the state type from the `initialState` argument
export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        // To declare the contents of `actions.payload` use the PayloadAction type.
        addTodo: (state, action: PayloadAction<any>) => {
            state.todoList.push(action.payload);
            return state;
        },
    },
});

export const { addTodo } = todoSlice.actions;

// For Selector use the imported `RootState` type.
export const getTodos = (state: RootState) => state.todo.todoList;

export default todoSlice.reducer;
