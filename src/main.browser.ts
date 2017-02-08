import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { TranslateModule, TranslatePipe }  from  'ng2-translate';
import { App } from './app/app.component';
import { MainComponent } from './app/main/main.component';
import { routes } from './app/app.routes';
import { LazyValidationDirective } from './app/shared/forms-and-errors/lazy-validation.directive';

import { ErrorMessageComponent } from './app/shared/forms-and-errors/error-message/error-message.component';
import { ErrorSummaryComponent } from './app/shared/forms-and-errors/error-summary/error-summary.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { ApiService } from './app/shared/api-service';
import {provideStore} from '@ngrx/store'
import {todos} from './app/state/todo/todo.reducers';
import {person} from './app/state/person/person.reducers';

import { TodoListComponent } from './app/example-redux/todo-list.component';
import { NewTodoComponent } from './app/example-redux/new-todo.component';
import { ExampleReduxComponent }  from './app/example-redux/example-redux.component';
import { Step1Component }  from './app/transaction-example/step1/step1.component';
import { Step2Component }  from './app/transaction-example/step2/step2.component';
import { VerifyStepsComponent }  from './app/transaction-example/verify-steps/verify-steps.component';

import {applicationParams} from './ng-app.config';

@NgModule({
  bootstrap: [ App ],
  declarations: [ 
      App, 
      MainComponent, 
      LazyValidationDirective, 
      ErrorMessageComponent, 
      ErrorSummaryComponent, 
      ExampleReduxComponent,
      NewTodoComponent,
      TodoListComponent,
      Step1Component,
      Step2Component,
      VerifyStepsComponent ],
  providers: [
    ApiService,
    {provide: applicationCache, useValue: window.localStorage},
    provideStore(
      {
        todos,
        person
      }
    )    
  ],
  imports: [
    FormsModule,
    Ng2PageScrollModule,
    RouterModule.forRoot(routes),
    TranslateModule.forRoot(),
    ReactiveFormsModule,
    UniversalModule // BrowserModule, HttpModule, and JsonpModule are included
  ]
})
export class MainModule {
}
