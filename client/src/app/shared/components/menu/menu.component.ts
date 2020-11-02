import {Component, Input, OnInit} from '@angular/core';
import {homePath} from "../../misc/constants";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MenuController} from "@ionic/angular";
import {EAction, IMenuItem, menu} from "./menu.constants";
import {TranslateService} from "@ngx-translate/core";

export const MENU_ADMIN_ID: string = 'admin';
export const MENU_HOME_ID: string = 'home';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    @Input()
    public menu: IMenuItem[] = menu;

    @Input()
    public showLogout: boolean = true;

    @Input()
    public menuContent: string = MENU_ADMIN_ID;

    @Input()
    public menuId: string = MENU_ADMIN_ID;

    constructor(private router: Router,
                private menuController: MenuController,
                private translate: TranslateService,
                private authService: AuthService) { }

    ngOnInit() {}

    onClick( item: IMenuItem ) {
        if (item.action.path) {
            this.menuController.close(this.menuId).then(
                () => {
                    this.router.navigate([item.action.path]);
                }
            );
        }
        if (item.action.action) {
            this.menuController.close(this.menuId);
            if (item.action.action === EAction.LOGOUT) {
                this.authService.onLogout();
                this.router.navigate(['/', homePath]);
            }
        }
    }

    close(): void {
        this.menuController.close(this.menuId);
    }

    signOut(): void {
        this.authService.onLogout();
        this.router.navigate(['/', homePath]);
    }
}
