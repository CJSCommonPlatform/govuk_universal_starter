import { Component, ViewEncapsulation } from '@angular/core';
// import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@Component({
  selector: 'app',
  styles: [require('./app.scss')],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.component.html')
})
export class App {

}
