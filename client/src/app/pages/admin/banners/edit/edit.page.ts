import {Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {adminPath, bannersPath, listPath} from "../../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../../shared/services/rest.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IBannerRequest, IBaseRequest, IBaseResponse} from "../../../../shared/misc/http-data";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../../shared/services/notification.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public backLink: string = `/${adminPath}/${bannersPath}/${listPath}`
    public form: FormGroup;

    public id: number;

    @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
    fileInputLabel: string;

    constructor(
        protected injector: Injector,
        private formBuilder: FormBuilder,
        private restService: RestService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService,
        private notificationService: NotificationService
    ) {
        super(injector)
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected afterInit(): void {
        this.form = this.formBuilder.group({
            image: [''],
            name: [''],
            description: [''],
            display: [false]
        });
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        debugger;
        if (id === 0) {
            this.form.get('image').setValidators([Validators.required, Validators.minLength(3)]);
        } else {
            this.id = Number(id);
            this.form.get('image').setValidators(null);
            this.getBanner(id);
        }

    }

    /**
     * Form
     */

    onFileSelect(event) {
        const file = event.target.files[0];
        this.fileInputLabel = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const decoded: string = String(reader.result).replace(/\+/gi, '%2B');
            this.form.get('image').setValue(decoded);
        };
    }

    /**
     * Rest
     */

    private getBanner(id: any): void {
        this.restService.get(`banners/${id}`).subscribe({
                next: (value: IBaseResponse) => {
                    const banner = {...value.data, image: ''};
                    this.form.patchValue(banner);
                    this.form.patchValue({display: banner.display === 1 ? true : false});
                }
            }
        );
    }


    private save(): void {
        const req: IBannerRequest = {data: {...this.form.value}};
        debugger;
        if (this.id) {
            req.data = {...req.data, id: this.id};
            this.restService.put(`banners/${this.id}`, req).subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            })
        } else {
            this.restService.post('banners', req).subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            })
        }
    }


    /**
     * Misc
     */

    onDisplayUpdate( $event: any ) {
        console.log($event);
    }

    onFormSubmit() {
        if (!this.form.valid) {
            return;
        }
        this.save();
    }

    private showMessage(value: IBaseResponse): void {
        const message: IMessageItem = {message: value.message, messageCode: 'Success', type: NotificationMessageType.success};
        this.notificationService.show(message);
    }

}
