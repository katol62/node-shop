import { Injectable } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    constructor() { }

    static compare(compareControlName: string) {
        return (control: FormControl) => {
            if (control.parent) {
                const form = control.parent as FormGroup;
                if (form) {
                    const compareControl = form.get(compareControlName) as FormControl;
                    if (control.value !== compareControl.value) {
                        return {invalidConfirmPassword: true};
                    }
                }
            }
            return null;
        };
    }

}
