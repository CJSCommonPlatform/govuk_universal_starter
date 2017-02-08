import { combineReducers } from '@ngrx/store'
import todos, { TodoState } from './todo/todo.reducers';
import person, { PersonState } from './person/person.reducers';

export interface AppState{
    todos: TodoState,
    person: PersonState
}

const reducers = Object.assign({
    todos,
    person
});

export default combineReducers(reducers); 