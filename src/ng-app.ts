import {App} from './app/app.component';
import {routes} from './app/app.routes';
import {MainComponent} from './app/main/main.component';
import {applicationParams, applicationOriginalUrl} from './ng-app.config';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {UniversalModule} from 'angular2-universal';
import { TranslateModule, TranslatePipe }  from  'ng2-translate';
import { LazyValidationDirective } from './app/components/forms-and-errors/lazy-validation.directive';
import { ErrorMessageComponent } from './app/components/forms-and-errors/error-message/error-message.component';
import { ErrorSummaryComponent } from './app/components/forms-and-errors/error-summary/error-summary.component';
import { ApiService } from './app/components/api-service';


export function ngApp(req, res) {
  let post = req.body || null;

  post.submit = req.query.submit;

  console.log('In ngApp post:', post);


  @NgModule({
    bootstrap: [ App ],
    declarations: [ App, MainComponent, LazyValidationDirective, ErrorMessageComponent, ErrorSummaryComponent ],
    providers: [
      ApiService,
      {provide: applicationParams, useValue: post},
      {provide: applicationOriginalUrl, useValue: req.originalUrl}
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
