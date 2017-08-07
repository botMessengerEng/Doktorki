import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => DateValidator), multi: true }
    ]
})
export class DateValidator implements Validator {
    constructor( @Attribute('validateEqual') public validateEqual: string) {}

    validate(c: AbstractControl): { [key: string]: any } {
        // self value (e.g. retype password)
        let v = c.value;

        // control value (e.g. password)
        let e = c.root.get(this.validateEqual);

        // value not equal
        if (e.value=='February' && v.value>29) 
        return {
            validateEqual: false
        }

        return null;
    }
}