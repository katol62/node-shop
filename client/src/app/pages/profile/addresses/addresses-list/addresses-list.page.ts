import { Component, OnInit } from '@angular/core';
import {addressesPath, adminPath, createPath, detailsPath, profilePath, usersPath} from "../../../../shared/misc/constants";
import {RestService} from "../../../../shared/services/rest.service";
import {IAddress} from "../../../../../../../server/src/models/Address";
import {IBaseResponse, IUser} from "../../../../shared/misc/http-data";
import {pluck} from "rxjs/operators";
import {from, of} from "rxjs";
import {Router} from "@angular/router";
import {AlertService, ConfirmData} from "../../../../shared/services/alert.service";

@Component({
    selector: 'app-addresses-list',
    templateUrl: './addresses-list.page.html',
    styleUrls: ['./addresses-list.page.scss'],
})
export class AddressesListPage implements OnInit {

    public profilePath = profilePath;
    public addressesPath = addressesPath;
    public createPath = createPath;
    public detailsPath = detailsPath;

    public addresses: IAddress[] = [];

    constructor(
        private restService: RestService,
        private alertService: AlertService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter(): void {
        this.getAddresses();
    }

    /**
     * Rest
     */

    protected getAddresses(): void {
        this.restService.get('addresses').subscribe({
            next: (result: IBaseResponse) => {
                this.addresses = result.data;
            }
        })
    }

    protected deleteAddress(id: number): void {
        this.restService.delete(`addresses/${id}`).subscribe({
            next: (value: IBaseResponse ) => {
                this.alertService.alert('GLOBAL.alert.success', 'GLOBAL.alert.deleteAddressConfirm').then(
                    result => {
                        this.getAddresses();
                    }
                );
            }
        })

    }

    /**
     * Misc
     */
     getAddress(address: IAddress): string {
         const adr = Object.keys(address).filter(key => (key === 'street' || key ==='house' || key ==='app') && address[key]).map(key => (key === 'app' ? 'app.' + address[key]: address[key]));
         return adr.join(', ');
    }


    delete( address: IAddress ) {
         this.alertService.confirm('GLOBAL.labels.confirm', `GLOBAL.alert.deleteAddress`, {data: address}).then(res => {
             if (res) {
                 this.deleteAddress(res.data.id);
             }
         })
    }

    processDelete(data: ConfirmData, parent: any): void {
         parent.deleteAddress(data.data.id);
    }

    edit( address: IAddress ) {
         this.router.navigate(['/', profilePath, addressesPath, address.id]);
    }
}
