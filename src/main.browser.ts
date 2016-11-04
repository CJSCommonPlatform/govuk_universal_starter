import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { TranslateModule, TranslatePipe }  from  'ng2-translate';
import { App } from './app/app.component';
import { MainComponent } from './app/main/main.component';
import { routes } from './app/app.routes';
import { LazyValidationDirective } from './app/components/forms-and-errors/lazy-validation.directive';

import { ErrorMessageComponent } from './app/components/forms-and-errors/error-message/error-message.component';
import { ErrorSummaryComponent } from './app/components/forms-and-errors/error-summary/error-summary.component';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { ApiService } from './app/components/api-service';


import {applicationParams} from './ng-app.config';

@NgModule({
  bootstrap: [ App ],
  declarations: [ App, MainComponent, LazyValidationDirective, ErrorMessageComponent, ErrorSummaryComponent ],
  providers: [
    ApiService
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
