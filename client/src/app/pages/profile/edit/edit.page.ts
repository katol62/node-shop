import {Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizedComponent} from "../../../shared/components/authorized/authorized.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IonInput} from "@ionic/angular";
import {RestService} from "../../../shared/services/rest.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../shared/services/alert.service";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../shared/services/notification.service";
import {adminPath, detailsPath, listPath, profilePath, usersPath} from "../../../shared/misc/constants";
import {IBaseRequest, IBaseResponse, IUser} from "../../../shared/misc/http-data";
import {createTextMaskInputElement} from "text-mask-core";
import {HelpService} from "../../../shared/services/help.service";
import {Device} from "../register/register.page";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public backLink = `/${profilePath}/${detailsPath}`
    public roles = ['super', 'admin', 'user'];

    public title: string = 'Edit User';

    public form: FormGroup;
    public id: any;

    @ViewChild('phoneInput')
    public set phoneInput(value: IonInput) {
        if (!value) {
            return;
        }

        value.getInputElement().then(input => this.registerTextMask(input));
    }

    public mask = ['+', /[7]/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    get phoneNumber() {
        return this.form.get('phone') as FormControl;
    }

    constructor(
        protected injector: Injector,
        private restService: RestService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private notificationService: NotificationService,

    ) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected afterInit(): void {
        this.form = this.formBuilder.group({
            id: [null],
            phone: [null, [Validators.required]],
            newPassword: [''],
            confirmPassword: [''],
            firstName: [''],
            lastName: [''],
            email: [''],
            dob: [''],
            role: [''],
            verified: [false],
        });

        this.getMe();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    /**
     * Rest
     */
    private getMe(): void {
        this.restService.get('me').subscribe({
                next: (value: IBaseResponse) => {

                    const user = {
                        ...value.data,
                        confirmPassword: '',
                        newPassword: '',
                        email: value.data.email && value.data.email !== 'null'  ? value.data.email : '',
                        dob: value.data.dob && value.data.dob !== 'null'  ? value.data.dob : '',
                        firstName: value.data.firstName && value.data.firstName !== 'null' ? value.data.firstName : '',
                        lastName: value.data.lastName && value.data.lastName !== 'null'  ? value.data.lastName : ''
                    };
                    this.form.patchValue(user);
                    this.form.get('phone').disable();
                    this.form.get('role').disable();
                    this.getDeviceInfo();
                }
            }
        );
    }

    private save(user: IUser): void {
        const rUser = {...user, password: user.newPassword}
        const profileRequest: IBaseRequest = {data: rUser};
        this.restService.put('me', profileRequest)
            .subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            });
    }

    update() {
        if (this.form.invalid) {
            return;
        }
        if (!this.form.touched) {
            this.notificationService.show({message: 'GLOBAL.labels.nothingChanged',
                type: NotificationMessageType.warning});
            return;
        }
        this.save(this.form.value);
    }

    /**
     * Misc
     */

    private registerTextMask(inputElement: HTMLInputElement) {
        const maskedInput = createTextMaskInputElement({
            inputElement,
            mask: this.mask,
            guide: true,
        });
        this.form.get('phone').valueChanges.subscribe(value => {
            maskedInput.update(value);
        });
    }

    onRoleUpdate( $event: any ) {
        const role = $event.detail.value;
    }

    private getDeviceInfo(): void {
        Device.getInfo().then(
            info => {
                console.log(info);
            }
        ).catch( e => {
            console.log(e);
        })
    }

    private showMessage(value: IBaseResponse): void {
        const text: string = value.code ? value.code : (value.message ? value.message : 'Unknown');
        const message: IMessageItem = {message: text, messageCode: 'Success', type: NotificationMessageType.success};
        this.notificationService.show(message);
    }

}
