import { applicationOriginalUrl, applicationParams } from '../../../ng-app.config';
import { Component, Optional, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducer';
import { PersonState } from '../../state/person/person.reducers';
import * as PersonActions from '../../state/person/person.actions';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {TranslateService, TranslatePipe} from 'ng2-translate';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html'
})
export class Step1Component{

  public innerParams: any;
  public step1Form: FormGroup;
  public firstName: String;
  public lastName: String;
  public validationErrors: any;
  public submitted: boolean;


  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private _router: Router,
    private translate: TranslateService,
    @Optional() @Inject(applicationParams) params?,
    @Optional() @Inject(applicationOriginalUrl) applicationUrl?) {
      translate.addLangs(['en-GB', 'cy']);
      translate.setDefaultLang('en-GB');

      let browserLang = translate.getBrowserLang();
      translate.use('en-GB');
      
      this.innerParams = params;
      
      if (this.innerParams) {
        this.firstName = params.firstName;
        this.lastName = params.lastName;
      }      
      this.step1Form = fb.group({
        'firstName': [this.firstName, Validators.required],
        'lastName': [this.lastName, Validators.required]
      });

      if(this.innerParams && this.innerParams.submit && this.step1Form.valid) {
        this.step1Submit();
      }
  }

  step1Submit() : void {
    this.addPersonalDetails({
      firstName: this.step1Form.controls['firstName'].value,
      lastName: this.step1Form.controls['lastName'].value
    });
    this.submitted = true;
    this.validationErrors = {};    
    this._router.navigate(['/step2']);
  }

  formErrors (event:Event): void {
    this.validationErrors = event;
  }

  addPersonalDetails(details){
    this.store.dispatch({
      type: PersonActions.ADD_PERSONAL_DETAILS,
      payload: details
    });
  }  

}