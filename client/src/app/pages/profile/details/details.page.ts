import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {IAuthResponse} from "../../../shared/misc/http-data";
import {Subscription} from "rxjs";
import {Platform} from "@ionic/angular";
import {addressesPath, detailsPath, profilePath} from "../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../shared/components/authorized/authorized.component";

@Component({
    selector: 'app-details',
    templateUrl: './details.page.html',
    styleUrls: ['./details.page.scss'],
})
export class DetailsPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public profilePath = profilePath;
    public detailPath = detailsPath;
    public addressesPath = addressesPath;

    public mobile: boolean;

    constructor(protected injector: Injector,
                private platform: Platform) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected afterInit(): void {
        console.log(this.authInfo);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

}
