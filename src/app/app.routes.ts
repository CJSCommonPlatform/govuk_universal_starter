import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ExampleReduxComponent } from './example-redux/example-redux.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'example-redux', component: ExampleReduxComponent },
  { path: '**', redirectTo: '' }
];
