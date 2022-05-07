/**
 * This todo action is a demo implementation of redux using connect API.
 * If you want, you can remove the code from this file or put it as a reference.
 */

import { ADDTODOS } from '@/src/constant/actionType';

export const addTodos = (value: string) => ({
    type: ADDTODOS,
    payload: value,
});
