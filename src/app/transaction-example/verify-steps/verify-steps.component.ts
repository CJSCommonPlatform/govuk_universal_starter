import 'rxjs/add/operator/do';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';

import { Component, Optional, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducer';
import { PersonState } from '../../state/person/person.reducers';
import * as PersonActions from '../../state/person/person.actions';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../../shared/api-service';
import {TranslateService, TranslatePipe} from 'ng2-translate';


@Component({
  selector: 'app-verify-steps',
  templateUrl: './verify-steps.component.html'
})
export class VerifyStepsComponent{

  person$: Observable<PersonState>;
  success: boolean = false;

  submit$ = new Subject<void>();

  ngOnDestroy$ = new Subject<void>();

  constructor(
    private store: Store<AppState>,
    private apiService: ApiService,
    private translate: TranslateService) {
  
    this.person$ = store.select('person')
      translate.addLangs(['en-GB', 'cy']);
      translate.setDefaultLang('en-GB');

      let browserLang = translate.getBrowserLang();
      translate.use('en-GB');

    this.submit$
      .switchMap(() => this.person$.first())      
      .switchMap(person => this.apiService.sendData(person))
      .takeUntil(this.ngOnDestroy$)
      .subscribe(
        data => {
          this.success = true;
        },
        error => console.log('Error:', error)
      );
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
  }
}