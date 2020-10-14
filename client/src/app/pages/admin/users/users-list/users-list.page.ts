import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {adminPath, createPath, usersPath} from "../../../../shared/misc/constants";
import {IBaseResponse, IUser} from "../../../../shared/misc/http-data";
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../../shared/services/rest.service";
import {AlertService} from "../../../../shared/services/alert.service";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.page.html',
    styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public title: string = 'Users List';

    public users: IUser[] = [];
    public hostId: number;

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
        this.hostId = this.authService.userId;
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
                    this.users = value.data;
                }, error: err => {}
            })
    }

    private deleteUser( id: number ) {
        this.restService.delete(`users/${id}`).subscribe({
            next: (value: IBaseResponse ) => {
                this.alertService.alert('Success', 'User deleted').then(
                    result => {
                        this.getUsers();
                    }
                );
            }
        })
    }

    /**
     * Actions
     */

    delete( user: IUser ) {
        this.alertService.confirm('Confirm', 'Delete user?', {data: user}).then(res => {
            if (res) {
                this.deleteUser(res.data.id);
            }
        })
    }

    edit( user: IUser ) {
        this.router.navigate(['/', adminPath, usersPath, user.id]);
    }

}
