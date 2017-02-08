import { 
    ADD_TODO, 
    UPDATE_TODO, 
    DELETE_TODO, 
    COMPLETE_TODO,
    UNCOMPLETE_TODO } from './todo.actions';

export interface TodoState{
    id: Number,
    text: String
}    

export const todos = (state = [], {type, payload}) => {
  switch(type){
    case ADD_TODO:
      return state.concat([Object.assign({}, payload, {id: state.length + 1})]);
    case UPDATE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, payload)
      });
    case COMPLETE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, {completed: true})
      });
    case UNCOMPLETE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, {completed: false})
      });
    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id);
    default:
      return state;
  }
}