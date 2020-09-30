import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IonInput, Platform} from "@ionic/angular";
import {VerificationService} from "../../../shared/services/verification.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ValidationService} from "../../../shared/services/validation.service";
import {IAuthRequest, IBaseResponse} from "../../../shared/misc/http-data";
import {VerificationState} from "../login/login.page";
import {detailsPath, profilePath} from "../../../shared/misc/constants";
import {createTextMaskInputElement} from "text-mask-core";
import {Router} from "@angular/router";
import {RestService} from "../../../shared/services/rest.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    private registerForm : FormGroup;
    public mobile: boolean;
    public state: VerificationState = VerificationState.phone;
    public code: string = '';

    @ViewChild('phoneInput')
    public set phoneInput(value: IonInput) {
        if (!value) {
            return;
        }

        value.getInputElement().then(input => this.registerTextMask(input));
    }

    public mask = ['+', /[7]/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    get phoneNumber() {
        if (this.mobile) {
            return this.registerForm.get('phone') as FormControl;
        }
        return this.registerForm.get('phone') as FormControl;
    }

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private platform: Platform,
                private verificationService: VerificationService,
                private authService: AuthService,
                private restService: RestService
    ) {
        this.registerForm = this.formBuilder.group({
            phone: [null, [Validators.required]],
            password: [''],
            confirmPassword: [''],
            firstName: [''],
            lastName: [''],
            email: [''],
            verified: [false],
        })
    }

    ngOnInit() {
        this.mobile = this.platform.is('mobile');
        this.resetForm();
    }

    private resetForm() {
        this.registerForm.reset();
        this.registerForm.get('password').setErrors(null);
        this.registerForm.get('confirmPassword').setErrors(null);
        this.registerForm.get('verified').setErrors(null);
        this.registerForm.get('password').setValidators(null);
        this.registerForm.get('verified').setValidators(null);

        if (!this.mobile) {
            this.registerForm.get('password').setValidators([Validators.required, Validators.minLength(3)]);
            this.registerForm.get('confirmPassword').setValidators([Validators.required, Validators.minLength(3), ValidationService.compare('password')]);
        }
    }

    /**
     * Actions
     */
    signUp(): void {
        console.log(this.registerForm.value);
        const full = this.registerForm.get('phone').value;
        const phone = full.replace(/\D+/g, '');
        if (this.mobile) {
            if (this.state === VerificationState.phone) {
                this.verificationService.verifyPhone(phone).subscribe({
                    next: ((result: boolean) => {
                        if (result) {
                            this.state = VerificationState.code;
                        }
                    })
                })
            } else {
                const code = String(this.code).replace(/\D+/g, '');
                this.verificationService.verifyCode(code).subscribe({
                    next: ((result: boolean) => {
                        if (result) {
                            this.state = VerificationState.phone;
                            const authData: IAuthRequest = {phone: phone, verified: true};
                            this.processRegister(authData);
                        } else {
                            this.state = VerificationState.phone;
                            this.resetForm();
                        }
                    })
                })
            }
        } else {
            const authData: IAuthRequest = {phone: phone, password: this.registerForm.get('password').value};
            this.processRegister(authData);
        }

    }

    private processRegister(authData: IAuthRequest): void {
        this.restService.postForm('register', authData).subscribe({
            next: (value: IBaseResponse) => {
                // const authData: IAuthRequest = value.data;
                debugger;
                this.authService.login(authData)
                    .subscribe({
                        next: value => {
                            this.afterSignIn();
                        }
                    });
            },
            error: error => {
                console.log(error);
                this.resetForm();
            }
        })
    }

    private afterSignIn(): void {
        this.router.navigate([profilePath, detailsPath]);
    }

    private registerTextMask(inputElement: HTMLInputElement) {
        const maskedInput = createTextMaskInputElement({
            inputElement,
            mask: this.mask,
            guide: true,
        });
        this.registerForm.get('phone').valueChanges.subscribe(value => {
            maskedInput.update(value);
        });
    }

    processCode( $event: any ) {
    }

}
