import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'todo-list',
  template: `
  <table class="table" *ngIf="todos.length">
    <thead>
        <tr>
            <th scope="col">Todo</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
      <tr *ngFor="let todo of todos">
        <td><span [class.completed]="todo.completed">{{todo.text}}</span></td>
        <td>
          <button class="button" *ngIf="!todo.completed" (click)="complete.emit(todo)">Done</button>
          <button class="button"  *ngIf="todo.completed" (click)="uncomplete.emit(todo)">Undo</button>
          <button class="button button-tertiary" (click)="destroy.emit(todo)">Delete</button>
        </td>
      </tr>        
    </tbody>
  `,
  styles: [`
    .completed {
      text-decoration: line-through;
    }
  `]
})
export class TodoListComponent {
  @Input() todos;
  @Output() complete = new EventEmitter();
  @Output() uncomplete = new EventEmitter();
  @Output('delete') destroy = new EventEmitter()
}