/**
 * This Todo reducer is a demo implementation of redux using connect API.
 * If you want, you can remove the code from this file or put it as a reference.
 */

import { PayloadAction } from '@reduxjs/toolkit';
import { TodoData } from '@/src/types/redux/todo';
import { ADDTODOS } from '@/src/constant/actionType';

const initialState: TodoData = {
    todoList: [],
    loading: false,
};

export default function (
    state = initialState,
    action: PayloadAction<{ type: string; payload: string | any }>
) {
    console.log(action);
    switch (action.type) {
        case ADDTODOS:
            return {
                ...state,
                todoList: [...state.todoList, action.payload],
            };

        default:
            return state;
    }
}
