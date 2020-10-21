import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IonInput} from "@ionic/angular";
import {ICode, VerificationService} from "../../../shared/services/verification.service";
import {AuthService} from "../../../shared/services/auth.service";
import {ValidationService} from "../../../shared/services/validation.service";
import {IBaseResponse, IRegRequest} from "../../../shared/misc/http-data";
import {VerificationState} from "../login/login.page";
import {detailsPath, profilePath} from "../../../shared/misc/constants";
import {createTextMaskInputElement} from "text-mask-core";
import {Router} from "@angular/router";
import {RestService} from "../../../shared/services/rest.service";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../shared/services/notification.service";
import { Plugins } from '@capacitor/core';
import {HelpService} from "../../../shared/services/help.service";

export const { Device } = Plugins;

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public registerForm : FormGroup;
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
                private verificationService: VerificationService,
                private notificationService: NotificationService,
                private authService: AuthService,
                private helpService: HelpService,
                private restService: RestService
    ) {
        this.registerForm = this.formBuilder.group({
            phone: [null, [Validators.required]],
            password: [''],
            confirmPassword: [''],
            firstName: [''],
            lastName: [''],
            email: [''],
            deviceId: [''],
            verified: [false]
        })
    }

    ngOnInit() {
        this.mobile = this.helpService.isMobile();
        this.resetForm();
        this.getDeviceInfo();
    }

    private resetForm() {
        this.registerForm.reset({
            phone: null,
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            email: '',
            deviceId: [''],
            verified: this.mobile ? true : false
        });
        this.registerForm.get('password').setErrors(null);
        this.registerForm.get('confirmPassword').setErrors(null);
        this.registerForm.get('password').setValidators(null);

        if (!this.mobile) {
            this.registerForm.get('password').setValidators([Validators.required, Validators.minLength(3)]);
            this.registerForm.get('confirmPassword').setValidators([Validators.required, Validators.minLength(3), ValidationService.compare('password')]);
        }
    }

    private getDeviceInfo(): void {
        Device.getInfo().then(
            info => {
                debugger;
                console.log(info);
                if (this.mobile) {
                    this.registerForm.patchValue({deviceId: info.uuid});
                }
            }
        ).catch( e => {
            debugger;
            console.log(e);
        })
    }

    /**
     * Actions
     */
    signUp(): void {
        console.log(this.registerForm.value);
        const value = this.registerForm.value;
        const full = this.registerForm.get('phone').value;
        const phone = full.replace(/\D+/g, '');
        let regRequest: IRegRequest = {...value, phone: phone};
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
                            // this.state = VerificationState.phone;
                            this.processRegister(regRequest);
                        } else {
                            this.state = VerificationState.phone;
                            this.resetForm();
                        }
                    })
                })
            }
        } else {
            this.processRegister(regRequest);
        }

    }

    private processRegister(authData: IRegRequest): void {
        this.restService.postForm('register', authData).subscribe({
            next: (value: IBaseResponse) => {
                // const authData: IAuthRequest = value.data;
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
                this.state = VerificationState.phone;
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
