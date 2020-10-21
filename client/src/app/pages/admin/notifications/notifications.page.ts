import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {adminPath, createPath, productsPath} from "../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../shared/services/rest.service";
import {AlertService} from "../../../shared/services/alert.service";
import {MenuController} from "@ionic/angular";
import {IBaseResponse, IUser} from "../../../shared/misc/http-data";

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public title: string = 'Send notification';
    public users: IUser[] = [];

    constructor(
        protected injector: Injector,
        private restService: RestService,
        private alertService: AlertService,
        private menu: MenuController)
    {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected afterInit(): void {
    }

    openMenu() {
        this.menu.open('left');
    }

    ionViewWillEnter() {
        this.getUsers();
    }

    /**
     * Rest
     */
    private getUsers(): void {
        const filter = {};
        const params = {...filter};
        this.restService.get('users', params)
            .subscribe({
                next: (value: IBaseResponse) => {
                    this.users = value.data.filter(user => user.deviceId !== null);
                }, error: err => {}
            })
    }

}
