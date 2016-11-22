import { Component } from '@angular/core';
import {TranslateService, TranslatePipe} from 'ng2-translate';

@Component({
  selector: 'home',
  templateUrl: 'main.template.html'
})
export class MainComponent{
  constructor(private translate: TranslateService) {
          translate.addLangs(['en-GB', 'cy']);
          translate.setDefaultLang('en-GB');

          let browserLang = translate.getBrowserLang();
          translate.use('en-GB');
  }
}
