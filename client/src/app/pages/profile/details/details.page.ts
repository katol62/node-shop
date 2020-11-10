import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {IAuthResponse, IBaseResponse, IUser} from "../../../shared/misc/http-data";
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";
import {addressesPath, adminPath, detailsPath, editPath, profilePath} from "../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../shared/services/rest.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public profilePath = profilePath;
    public detailPath = detailsPath;
    public addressesPath = addressesPath;
    public adminPath = adminPath;

    public details: IUser;

    constructor(protected injector: Injector,
                private restService: RestService) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected afterInit(): void {
        console.log(this.authInfo);
        this.getProfile();
    }

    ionViewWillEnter(): void {
        this.getProfile();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    edit() {
        this.router.navigate(['/', profilePath, editPath])
    }

    logout() {
        this.authService.onLogout();
        this.router.navigate(['/']);
    }

    isAdmin(): boolean {
        return (this.authInfo.user.role === 'super' || this.authInfo.user.role === 'admin');
    }

    /**
     * Rest
     */
    private getProfile(): void {
        this.restService.get('me').subscribe({
            next: ((result: IBaseResponse) => {
                this.details = result.data;
            })
        })
    }
}
