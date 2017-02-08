import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ExampleReduxComponent } from './example-redux/example-redux.component';
import { Step1Component } from './transaction-example/step1/step1.component';
import { Step2Component } from './transaction-example/step2/step2.component';
import { VerifyStepsComponent } from './transaction-example/verify-steps/verify-steps.component';


export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'example-redux', component: ExampleReduxComponent },
  { path: 'step1', component: Step1Component , data: {'post': true}},
  { path: 'step2', component: Step2Component , data: {'post': true}},
  { path: 'verify-data', component: VerifyStepsComponent },
  { path: '**', redirectTo: '' }
];
