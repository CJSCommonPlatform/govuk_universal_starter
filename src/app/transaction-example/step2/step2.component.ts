import { applicationOriginalUrl, applicationParams } from '../../../ng-app.config';
import { Component, Optional, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducer';
import { PersonState } from '../../state/person/person.reducers';
import * as PersonActions from '../../state/person/person.actions';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {TranslateService, TranslatePipe} from 'ng2-translate';
import {Router} from '@angular/router';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html'
})
export class Step2Component{

  public innerParams: any;
  public step2Form: FormGroup;
  public email: String;
  public lastName: String;
  public validationErrors: any;
  public submitted: boolean;


  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private translate: TranslateService,
    private _route: Router,
    @Optional() @Inject(applicationParams) params?,
    @Optional() @Inject(applicationOriginalUrl) applicationUrl?) {
      translate.addLangs(['en-GB', 'cy']);
      translate.setDefaultLang('en-GB');

      let browserLang = translate.getBrowserLang();
      translate.use('en-GB');

      this.innerParams = params;
      
      if (this.innerParams) {
        this.email = params.email;
      }      
      this.step2Form = fb.group({
        'email': [this.email, Validators.required]
      });

      if(this.innerParams && this.step2Form.valid) {
        this.step2Submit();
      }
  }

  step2Submit() : void {
    this.addEmail({
      email: this.step2Form.controls['email'].value
    });
    this.submitted = true;
    this.validationErrors = {};    
    this._route.navigate(['/verify-data'])
  }

  formErrors (event:Event): void {
    this.validationErrors = event;
  }

  addEmail(details){
    this.store.dispatch({
      type: PersonActions.ADD_EMAIL,
      payload: details
    });
  }  

}