import {Component, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'new-todo-input',
  template: `
    <div>
      <div class="form-group">
        <label for="todo-input" class="form-label">Add a task todo</label>
        <input type="text" class="form-control" #newtodo id="todo-input"/>
      </div>
      <div class="form-group">
        <button class="button" (click)="saveTodo(newtodo)">Add</button>
      </div>      
    </div>
  `
})
export class NewTodoComponent {
  @Output() create = new EventEmitter();
  saveTodo(el){
    this.create.emit({text: el.value});
    el.value = ''
  }
}