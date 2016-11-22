import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import { AppState } from '../state/reducer';
import { TodoState } from '../state/todo/todo.reducers';
import {Observable} from "rxjs/Observable";
import * as TodoActions from '../state/todo/todo.actions';

import {NewTodoComponent} from './new-todo.component';
import {TodoListComponent} from './todo-list.component';

@Component({
  selector: 'todo-app',
  providers: [],
  template: `
    <div>
      <h1 class="heading-xlarge">Example of Todo list made using ng-rx (redux)</h1>
      <new-todo-input (create)="addTodo($event)"></new-todo-input>

      <todo-list
        [todos]="todos$ | async"
        (complete)="completeTodo($event)"
        (uncomplete)="uncompleteTodo($event)"
        (delete)="deleteTodo($event)"
      ></todo-list>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleReduxComponent {
  todos$: Observable<TodoState>;

  constructor(private store: Store<AppState>) {
    this.todos$ = store.select('todos').map((data) => data);
  }
  addTodo(newTodo){
    this.store.dispatch({
      type: TodoActions.ADD_TODO,
      payload: newTodo
    });
  }
  completeTodo(todo){
    this.store.dispatch({
      type: TodoActions.COMPLETE_TODO,
      payload: todo
    });
  }
  uncompleteTodo(todo){
    this.store.dispatch({
      type: TodoActions.UNCOMPLETE_TODO,
      payload: todo
    });
  }
  deleteTodo(todo){
    this.store.dispatch({
      type: TodoActions.DELETE_TODO,
      payload: todo
    });
  }
}