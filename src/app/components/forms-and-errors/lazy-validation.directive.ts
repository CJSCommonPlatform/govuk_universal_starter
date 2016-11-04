import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/filter';

@Directive({
  selector: '[lazyValidation]'
})
export class LazyValidationDirective{
  
  @Input() lazyValidation: FormGroup; 
  @Output() lazySubmit = new EventEmitter();
  @Output() errors = new EventEmitter();

  @HostListener('ngSubmit') onSubmit() {

    if (this.lazyValidation.valid) {
      this.lazySubmit.emit(this.lazyValidation.value);
      return true;
    }

    let wrongFields = {};
      for (var property in this.lazyValidation.controls) {
          if (this.lazyValidation.controls.hasOwnProperty(property) && 
              this.lazyValidation.controls[property].errors) {
              wrongFields[property] = {errors: this.lazyValidation.controls[property].errors};
          }
      }          

    this.errors.emit(wrongFields);    
    return false;
  }
}
