import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {IAuthResponse} from "../../misc/http-data";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {HelpService} from "../../services/help.service";

@Component({
    selector: 'app-authorized',
    templateUrl: './authorized.component.html',
    styleUrls: ['./authorized.component.scss'],
})
export abstract class AuthorizedComponent implements OnInit, OnDestroy {

    public authInfo: IAuthResponse;
    public mobile: boolean;

    protected authSubscriber: Subscription;
    protected router: Router;
    protected authService: AuthService;
    protected helpService: HelpService;

    protected constructor(protected injector: Injector) {
        this.router = injector.get(Router);
        this.authService = injector.get(AuthService);
        this.helpService = injector.get(HelpService);
    }

    ngOnInit() {
        this.mobile = this.helpService.isMobile();
        this.authSubscriber = this.authService.authInfo
            .subscribe((info: IAuthResponse) => {
                this.authInfo = info.data ? info.data : info;
                this.afterInit();
            });
    }

    ionViewWillEnter(): void {
    }

    ngOnDestroy(): void {
        this.authSubscriber.unsubscribe();
        this.authSubscriber = null;
    }

    protected abstract afterInit(): void;
}
