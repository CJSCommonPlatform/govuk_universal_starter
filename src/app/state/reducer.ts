import { combineReducers } from '@ngrx/store'
import todos, { TodoState } from './todo/todo.reducers';

export interface AppState{
    todos: TodoState
}

const reducers = Object.assign({
    todos
});

export default combineReducers(reducers); 