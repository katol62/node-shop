import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";
import {IAuthRequest} from "../../../shared/misc/http-data";
import {detailsPath, profilePath, registerPath} from "../../../shared/misc/constants";
import {IonInput, Platform} from "@ionic/angular";
import {createTextMaskInputElement} from 'text-mask-core';
import {ICode, VerificationService} from "../../../shared/services/verification.service";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../shared/services/notification.service";
import {HelpService} from "../../../shared/services/help.service";
import {ISmsCode, SmsVerificationService} from "../../../shared/services/sms-verification.service";

export enum VerificationState {
    phone = 'phone', code = 'code', done = 'done'
}

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public loginForm: FormGroup;
    public mobile: boolean;

    public code: string = '';
    public state: VerificationState = VerificationState.phone;

    public profilePath = profilePath;
    public registerPath = registerPath;

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
            return this.loginForm.get('phone') as FormControl;
        }
        return this.loginForm.get('phone') as FormControl;
    }

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private notificationService: NotificationService,
                private verificationService: VerificationService,
                private smsVerificationService: SmsVerificationService,
                private helpService: HelpService,
                private authService: AuthService) {
        this.loginForm = this.formBuilder.group({
            phone: [null, [Validators.required]],
            password: [''],
            verified: [false],
        });
    }

    ngOnInit() {
        this.mobile = this.helpService.isMobile();
        this.resetForm();
    }

    private resetForm(): void {
        this.loginForm.reset();
        this.loginForm.get('password').setErrors(null);
        this.loginForm.get('verified').setErrors(null);
        this.loginForm.get('password').setValidators(null);
        this.loginForm.get('verified').setValidators(null);

        if (this.mobile) {
            // this.loginForm.get('verified').setValidators([Validators.required, Validators.requiredTrue]);
        } else {
            this.loginForm.get('password').setValidators([Validators.required]);
        }
    }


    /**
     * Actions
     */

    logIn(){
        console.log(this.loginForm.value);
        const full = this.loginForm.get('phone').value;
        const phone = full.replace(/\D+/g, '');
        if (this.mobile) {
            if (this.state === VerificationState.phone) {
                this.smsVerificationService.verifyPhone(phone).subscribe({
                    next: ((result: ISmsCode) => {
                        if (result) {
                            if (Number(result.code) > 0 && Number(result.code) < 104) {
                                this.state = VerificationState.code;
                            } else {
                                const message: IMessageItem = {
                                    type: NotificationMessageType.error,
                                    message: result.message,
                                    messageCode: String(result.code)
                                }
                                this.notificationService.show(message);
                            }
                        }
                    })
                })
            } else {
                const code = String(this.code).replace(/\D+/g, '');
                this.smsVerificationService.verifyCode(code).subscribe({
                    next: ((result: boolean) => {
                        if (result) {
                            this.state = VerificationState.phone;
                            const authData: IAuthRequest = {phone: phone, verified: true};
                            this.processLogin(authData);
                        } else {
                            this.state = VerificationState.phone;
                            this.resetForm();
                        }
                    })
                })
            }
        } else {
            const authData: IAuthRequest = {phone: phone, password: this.loginForm.get('password').value};
            this.processLogin(authData);
        }
    }

    logInOld(){
        console.log(this.loginForm.value);
        const full = this.loginForm.get('phone').value;
        const phone = full.replace(/\D+/g, '');
        if (this.mobile) {
            if (this.state === VerificationState.phone) {
                this.verificationService.verifyPhone(phone).subscribe({
                    next: ((result: ICode) => {
                        if (result) {
                            if (result.code.toString() === '1') {
                                this.state = VerificationState.code;
                            } else {
                                const message: IMessageItem = {
                                    type: NotificationMessageType.error,
                                    message: result.message,
                                    messageCode: String(result.code)
                                }
                                this.notificationService.show(message);
                            }
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
                            this.processLogin(authData);
                        } else {
                            this.state = VerificationState.phone;
                            this.resetForm();
                        }
                    })
                })
            }
        } else {
            const authData: IAuthRequest = {phone: phone, password: this.loginForm.get('password').value};
            this.processLogin(authData);
        }
    }

    private processLogin(authData: IAuthRequest): void {
        this.authService.login(authData)
            .subscribe({
                next: value => {
                    this.afterSignIn();
                },
                error: error => {
                    console.log(error);
                    this.resetForm();
                }
            });
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
        this.loginForm.get('phone').valueChanges.subscribe(value => {
            maskedInput.update(value);
        });
    }

    processCode( $event: any ) {
    }
}
