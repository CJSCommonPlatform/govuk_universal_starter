import { Component, Input, OnChanges } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'error-summary',
    template: require('./error-summary.template.html')
})
export class ErrorSummaryComponent implements OnChanges {
    @Input() errors: any;
    @Input() fields: any;
    
    public innerErrors: Array<any> = [];
    private location: string;

    constructor(loc: Location) {
        this.location = loc.path(false);
    }

    ngOnChanges(newChanges: any) {
        if(newChanges.errors.currentValue) {
            console.log(newChanges.errors.currentValue);
            this.innerErrors = [];
            this.fields.forEach(field => {
                if(newChanges.errors.currentValue[this.dashToCamel(field.label)] &&
                newChanges.errors.currentValue[this.dashToCamel(field.label)].errors) {
                    this.innerErrors.push({
                        shortId: `#${this.addErrorTo(field.label)}`,
                        fullId: `${this.location}#${this.addErrorTo(field.label)}`,
                        label: this.dashToCamel(field.label),
                        title: field.title
                    });
                }
            })
        } 
    }

    dashToCamel(someString: string): string {
        return someString
                .split('-')
                .map((stringPart, index) => index ? stringPart.replace(stringPart[0], stringPart[0].toUpperCase()) : stringPart )
                .join('');
    }

    addErrorTo(someString: string): string {
        return 'error-' + someString;
    }
}
