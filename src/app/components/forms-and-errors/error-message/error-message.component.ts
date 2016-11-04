import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'error-message',
    template: require('./error-message.template.html')
})
export class ErrorMessageComponent implements OnChanges {
    @Input() EMerrors: any;
    @Input() inputHTMLType: string;
    @Input() inputHTMLName: string;

    private customValidation: any;
    private language: string;
    private inputType: string;
    private errorMessage: any;

    private errorMessages: any = {
        'en': {
            'input': {
                'required': 'Provide this information',
                'minlength': 'Minimum 10 characters',
                'email': 'Email not valid – enter correct address',
                'ukPostcode': 'Postcode is invalid'
            },
            'email': {
                'email': 'Email not valid – enter correct address'
            },
            'textarea': {
                'required': 'Provide this information'
            },
            'radio': {
                'required': 'Choose an answer'
            },
            'checkbox': {
                'required': 'Choose at least one answer'
            },
            'date': {
                'required': 'Provide this information',
                'past': 'Date can\'t be in future – enter valid date',
                'future': 'Date can\'t be in past – enter valid date',
                'minage': 'Age too young – enter valid date of birth',
                'dateFormat': 'Date not recognised – use format, for example 19 8 2016',
                'dateExists': 'Date doesn\'t exist – enter again'
            }
        }
    };

    ngOnChanges(newChanges: any) {
        
        if (this.language === undefined) { this.language = 'en' };
        this.inputType  = this.inputHTMLType || 'input';
        
        if (newChanges.EMerrors.currentValue && newChanges.EMerrors.currentValue[this.inputHTMLName] && newChanges.EMerrors.currentValue[this.inputHTMLName].errors) {
            let error: string = Object.keys(newChanges.EMerrors.currentValue[this.inputHTMLName].errors)[0].toString();
            this.errorMessage = this.errorMessages[this.language][this.inputType][error];
        } else {
            this.errorMessage = undefined;
        }
    }
}
