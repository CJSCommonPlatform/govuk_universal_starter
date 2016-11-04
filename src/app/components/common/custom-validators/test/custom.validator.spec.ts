import { Component, Directive } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { dispatchEvent } from '@angular/platform-browser/testing/browser_util';
import { By } from '@angular/platform-browser';
import { FormsModule, NG_VALIDATORS, AbstractControl,
         NgForm, FormControl } from '@angular/forms';

import { CustomValidators } from '../custom.validator';

describe('component: TestComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FormControl ],
            declarations: [ CustomValidators ]
        });
    });

    it('should be false when postcode is invalid', () => {
        expect(CustomValidators.postcodeValidator(new FormControl('ABC'))).toEqual({'ukPostcode': false});
    });
    
    it('should be null when postcode with spaces is valid', () => {
        expect(CustomValidators.postcodeValidator(new FormControl('SW15 2QA'))).toEqual(null);
    });
    
    it('should be null when postcode without spaces is valid', () => {
        expect(CustomValidators.postcodeValidator(new FormControl('SW152QA'))).toEqual(null);
    });
    
    it('should be false when phone number is invalid', () => {
        expect(CustomValidators.ukPhoneValidator(new FormControl('020864976'))).toEqual({'ukPhone': false});
    });
    
    it('should be null when phone number is valid', () => {
        expect(CustomValidators.ukPhoneValidator(new FormControl('02086497612'))).toEqual(null);
    });
    
    it('should be false when nin number is invalid', () => {
        expect(CustomValidators.ninValidator(new FormControl('XY12345A'))).toEqual({'nin': false});
    });
    
    it('should be null when nin number is valid', () => {
        expect(CustomValidators.ninValidator(new FormControl('AB123456Z'))).toEqual(null);
    });
    
    it('should be false when email is invalid', () => {
        expect(CustomValidators.emailValidator(new FormControl('test@fsa'))).toEqual({'validEmail': false});
    });
    
    it('should be null when email is valid', () => {
        expect(CustomValidators.emailValidator(new FormControl('test@gmail.com'))).toEqual(null);
    });

});