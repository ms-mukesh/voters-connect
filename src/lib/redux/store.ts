import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import TodoReducer from './reducers/TodoReducer';

export default createStore(
    // Place your reducer inside this combineReducers object.
    combineReducers({
        todo: TodoReducer,
    }),
    applyMiddleware(thunk)
);
