import {Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {adminPath, categoriesPath, listPath} from "../../../../shared/misc/constants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../../shared/services/rest.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../shared/services/alert.service";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../../shared/services/notification.service";
import {IBaseRequest, IBaseResponse} from "../../../../shared/misc/http-data";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public backLink: string = `/${adminPath}/${categoriesPath}/${listPath}`
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
        private translate: TranslateService,
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
        if (id === 0) {
            this.form.get('image').setValidators([Validators.required, Validators.minLength(3)]);
        } else {
            this.id = Number(id);
            this.form.get('image').setValidators(null);
            this.getCategory(id);
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

    private getCategory(id: any): void {
        this.restService.get(`categories/${id}`).subscribe({
                next: (value: IBaseResponse) => {
                    const category = {...value.data, image: ''};
                    this.form.patchValue(category);
                    this.form.patchValue({display: category.display === 1});
                }
            }
        );
    }


    private save(): void {
        const req: IBaseRequest = {data: {...this.form.value}};
        if (this.id) {
            req.data = {...req.data, id: this.id};
            this.restService.put(`categories/${this.id}`, req).subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            })
        } else {
            this.restService.post('categories', req).subscribe({
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
        const text: string = value.code ? value.code : (value.message ? value.message : 'Unknown');
        const message: IMessageItem = {message: text, messageCode: 'Success', type: NotificationMessageType.success};
        this.notificationService.show(message);
    }

}
