import { Component, OnInit } from '@angular/core';
import {adminPath, bannersPath, categoriesPath, homePath, listPath, notificationsPath, productsPath, usersPath} from "../../misc/constants";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MenuController} from "@ionic/angular";

export enum EAction {
    LOGOUT = 'logout'
}

export interface IMenuAction {
    path?: string;
    action?: EAction
}

export interface IMenuItem {
    id: number;
    label: string;
    icon: string;
    action: IMenuAction
}

export const menu: IMenuItem[] = [
    {id: 0, label: 'Home', icon: 'home-outline', action: {path: '/' + homePath}},
    {id: 1, label: 'Categories', icon: 'list-outline', action: {path: '/' + adminPath + '/' + categoriesPath + '/' + listPath}},
    {id: 2, label: 'Products', icon: 'layers-outline', action: {path: '/' + adminPath + '/' + productsPath + '/' + listPath}},
    // {id: 3, label: 'Orders', icon: 'cart-outline', action: {path: '/' + adminPath + '/' + categoriesPath + '/' + listPath}},
    {id: 4, label: 'Users', icon: 'people-outline', action: {path: '/' + adminPath + '/' + usersPath + '/' + listPath}},
    {id: 5, label: 'Banners', icon: 'image-outline', action: {path: '/' + adminPath + '/' + bannersPath + '/' + listPath}},
    {id: 6, label: 'Notifications', icon: 'chatbubble-ellipses-outline', action: {path: '/' + adminPath + '/' + notificationsPath}},
]
export const MENU_ID: string = 'left';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    public menuId = MENU_ID;
    public menu: IMenuItem[] = menu;

    constructor(private router: Router,
                private menuController: MenuController,
                private authService: AuthService) { }

    ngOnInit() {}

    onClick( item: IMenuItem ) {
        if (item.action.path) {
            debugger;
            this.menuController.close().then(
                () => {
                    this.router.navigate([item.action.path]);
                }
            );
        }
        if (item.action.action) {
            this.menuController.close();
            if (item.action.action === EAction.LOGOUT) {
                this.authService.onLogout();
                this.router.navigate(['/', homePath]);
            }
        }
    }

    signOut(): void {
        this.authService.onLogout();
        this.router.navigate(['/', homePath]);
    }
}
