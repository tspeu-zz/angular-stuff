import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CustomvalidationService {

    validateIfChecked(condition: string): ValidatorFn {
    return (formGroup: FormGroup) => {
    const checked = formGroup.controls[condition];

    if (checked) {
                {  checked.setErrors({ mustcheck: true }); }
        }
    return null;
        };
    }

    loginValidation(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
        if (!control.value) {
        return null;
        }
        const regexEmail = new RegExp('^[a-z0-9._%-]+@[a-z0-9._%-]+\\.[a-z]{2,3}$');
        const regexCode = new RegExp('^[A-Z0-9]{6}$');

        const validEmail = regexEmail.test(control.value);
        const validCode =  regexCode.test(control.value);
        const valid = validEmail || validCode ? true : null;

        return valid ? null : { invalidPassword: true };
        };
    }

    MustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

}
