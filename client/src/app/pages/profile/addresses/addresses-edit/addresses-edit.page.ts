import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../../shared/services/rest.service";
import {ActivatedRoute} from "@angular/router";
import {IBaseRequest, IBaseResponse} from "../../../../shared/misc/http-data";
import {addressesPath, profilePath} from "../../../../shared/misc/constants";
import {PlaceService} from "../../../../shared/services/place.service";
import {IAddress} from "../../../../../../../server/src/models/Address";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../../../shared/services/notification.service";
import {IonicSelectableComponent} from "ionic-selectable";

@Component({
    selector: 'app-addresses-edit',
    templateUrl: './addresses-edit.page.html',
    styleUrls: ['./addresses-edit.page.scss'],
})
export class AddressesEditPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public addressesPath = addressesPath;
    public profilePath = profilePath;

    public form: FormGroup;
    public id: number;

    public cities: string[] = [];
    public streets: string[] = [];

    constructor(
        protected injector: Injector,
        private restService: RestService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private notificationService: NotificationService,
        private placeService: PlaceService
    ) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected afterInit(): void {
        this.form = this.formBuilder.group({
            id: [null],
            city: ['', Validators.compose([Validators.required])],
            street: ['', Validators.compose([Validators.required])],
            house: ['', Validators.compose([Validators.required])],
            app: [''],
            entrance: [''],
            floor: [''],
            code: [''],
            userId: [null, Validators.compose([Validators.required])]
        });

        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.id = Number(id);
            this.getAddress(this.id);
        } else {
        }

        this.form.patchValue({userId: this.authInfo.user.id});
        this.placeService.cities().then(
            result => {
                this.cities = result;
            }
        )
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    private getAddress( id: number ) {
        this.restService.get(`/addresses/${id}` ).subscribe({
            next: (value: IBaseResponse) => {
                const data = value.data;
                this.placeService.streets(data.city).then(
                    result => {
                        this.streets = result.map(item => item);
                        this.form.patchValue(data);
                        debugger;
                    }
                )
            },
            error: err => {}
        })

    }

    onCitySelect( $event: any ) {
        this.streets = this.placeService.getStreets($event.detail.value).map(item => item);
        debugger;
    }

    save() {
        const formData: IAddress = this.form.value as IAddress;
        if (this.id) {
            const req: IBaseRequest = {data: formData};
            this.restService.put(`addresses/${this.id}`, req).subscribe({
                next: (value: IBaseResponse) => {
                    console.log(value);
                    this.showMessage(value);
                }
            })
        } else {
            const {id, ...address} = formData;
            const req: IBaseRequest = {data: address};
            this.restService.post('addresses/create', req).subscribe({
                next: (value: IBaseResponse) => {
                    console.log(value);
                    this.showMessage(value);
                }
            })
        }
    }

    private showMessage(value: IBaseResponse): void {
        const message: IMessageItem = {message: value.message, messageCode: 'Success', type: NotificationMessageType.success};
        this.notificationService.show(message);
    }

    streetChange( $event: { component: IonicSelectableComponent; value: any } ) {
        console.log($event.value);
    }
}
