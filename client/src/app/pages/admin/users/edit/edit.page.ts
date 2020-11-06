import {Component, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../../shared/services/rest.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../../shared/services/notification.service";
import {IonInput} from "@ionic/angular";
import {createTextMaskInputElement} from "text-mask-core";
import {IBaseRequest, IBaseResponse, IUser} from "../../../../shared/misc/http-data";
import {adminPath, listPath, usersPath} from "../../../../shared/misc/constants";
import {AlertService} from "../../../../shared/services/alert.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public backLink: string = `/${adminPath}/${usersPath}/${listPath}`

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
        private translate: TranslateService,
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
            role: ['user'],
            verified: [false],
        });

        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        if (isNaN(id)) {
            this.alertService.alert('Warning', 'Incorrect parameter').then(
                res => {
                    this.router.navigate(['/', adminPath, usersPath, listPath]);
                }
            )
        } else {
            this.getUser(id);
        }
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
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
     * Rest
     */
    private getUser(id: any): void {
        this.restService.get(`users/${id}`).subscribe({
                next: (value: IBaseResponse) => {
                    const user = {...value.data, password: '', newPassword: ''};
                    this.form.patchValue(user);
                }
            }
        );
    }

    private save(user: IUser): void {
        const rUser = {...user, password: user.newPassword}
        const adminRequest: IBaseRequest = {data: rUser};
        this.restService.put(`users/${String(user.id)}`, adminRequest)
            .subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            });
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

    private showMessage(value: IBaseResponse): void {
        const text: string = value.code ? value.code : (value.message ? value.message : 'Unknown');
        const message: IMessageItem = {message: text, messageCode: 'Success', type: NotificationMessageType.success};
        this.notificationService.show(message);
    }

}
