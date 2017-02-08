import {App} from './app/app.component';
import {routes} from './app/app.routes';
import {MainComponent} from './app/main/main.component';
import {applicationParams, applicationOriginalUrl, applicationCache} from './ng-app.config';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UniversalModule} from 'angular2-universal';
import { TranslateModule, TranslatePipe }  from  'ng2-translate';
import { LazyValidationDirective } from './app/shared/forms-and-errors/lazy-validation.directive';
import { ErrorMessageComponent } from './app/shared/forms-and-errors/error-message/error-message.component';
import { ErrorSummaryComponent } from './app/shared/forms-and-errors/error-summary/error-summary.component';
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

export function ngApp(req, res) {
  let post = req.body || null;

  post.submit = req.query.submit;

  console.log('In ngApp post:', post);

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
      {provide: applicationParams, useValue: post},
      {provide: applicationOriginalUrl, useValue: req.originalUrl},
      {provide: applicationCache, useValue: {getItem() {} }},
      provideStore(
        {
          todos,
          person
        }
      )
    ],
    imports: [
      FormsModule,
      RouterModule.forRoot(routes),
      TranslateModule.forRoot(),
      ReactiveFormsModule,
      UniversalModule // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    ]
  })
  class MainModule {
  }


  res.render('index', {
    req,
    res,
    ngModule: MainModule,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.protocol + '://' + req.get('host')
  });
}