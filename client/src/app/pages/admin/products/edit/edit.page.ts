import {Component, ElementRef, Injector, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {adminPath, categoriesPath, listPath, productsPath} from "../../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../../shared/services/rest.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../../../shared/services/alert.service";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../../shared/services/notification.service";
import {IBaseRequest, IBaseResponse} from "../../../../shared/misc/http-data";
import {ICategory} from "../../../../../../../server/src/models/Category";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public backLink: string = `/${adminPath}/${productsPath}/${listPath}`
    public form: FormGroup;

    public id: number;

    public categories: ICategory[] | null = [];

    @ViewChild('UploadFileInput1', { static: false }) uploadFileInput1: ElementRef;
    fileInputLabel1: string;
    @ViewChild('UploadFileInput2', { static: false }) uploadFileInput2: ElementRef;
    fileInputLabel2: string;
    @ViewChild('UploadFileInput3', { static: false }) uploadFileInput3: ElementRef;
    fileInputLabel3: string;
    @ViewChild('UploadFileInput4', { static: false }) uploadFileInput4: ElementRef;
    fileInputLabel4: string;

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

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    ionViewWillEnter() {
        this.getCategories();
    }

    protected afterInit(): void {
        this.form = this.formBuilder.group({
            image1: [''],
            image2: [''],
            image3: [''],
            image4: [''],
            name: [''],
            category: [[], [Validators.required]],
            description: ['']
        });
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        if (id === 0) {
            this.form.get('image1').setValidators([Validators.required]);
        } else {
            this.id = Number(id);
            this.form.get('image1').setValidators(null);
            this.getProduct(id);
        }

    }

    /**
     * Form
     */

    onFileSelect(event) {
        const id = event.currentTarget.id;
        const file = event.target.files[0];
        this['fileInputLabel' + id] = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const decoded: string = String(reader.result).replace(/\+/gi, '%2B');
            this.form.get('image' + id).setValue(decoded);
        };
    }

    /**
     * Rest
     */

    private getCategories() {
        const req: any = {all: true};
        this.restService.get('categories', req).subscribe({
            next: ((result: IBaseResponse) => {
                this.categories = result.data;
            })
        })
    }

    private getProduct(id: any): void {
        this.restService.get(`products/${id}`).subscribe({
                next: (value: IBaseResponse) => {
                    const product = {...value.data, image1: '', image2: '', image3: '', image4: ''};
                    this.form.patchValue(product);
                }
            }
        );
    }

    private save() {
        const req: IBaseRequest = {data: {...this.form.value}};
        if (this.id) {
            req.data = {...req.data, id: this.id};
            this.restService.put(`products/${this.id}`, req).subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            })
        } else {
            this.restService.post('products', req).subscribe({
                next: (value: IBaseResponse) => {
                    this.showMessage(value);
                }
            })
        }

    }

    /**
     * Actions
     */

    onFormSubmit(): void {
        if (!this.form.valid) {
            return;
        }
        this.save();
    }

    private showMessage(value: IBaseResponse): void {
        const message: IMessageItem = {message: value.message, messageCode: 'Success', type: NotificationMessageType.success};
        this.notificationService.show(message);
    }

    reset() {
    }
}
