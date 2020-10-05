import { Component, OnInit } from '@angular/core';
import {adminPath, categoriesPath, homePath, listPath, productsPath, usersPath} from "../../misc/constants";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

export enum EAction {
    LOGOUT = 'logout'
}

export interface IMenuAction {
    path?: string[];
    action?: EAction
}

export interface IMenuItem {
    id: number;
    label: string;
    icon: string;
    action: IMenuAction
}

export const menu: IMenuItem[] = [
    {id: 0, label: 'Users', icon: 'people-outline', action: {path: ['/', adminPath, usersPath, listPath]}},
    {id: 1, label: 'Categories', icon: 'list-outline', action: {path: ['/', adminPath, categoriesPath, listPath]}},
    {id: 2, label: 'Products', icon: 'layers-outline', action: {path: ['/', adminPath, productsPath, listPath]}},
    {id: 3, label: 'Orders', icon: 'cart-outline', action: {path: ['/', adminPath, categoriesPath, listPath]}},
    {id: 4, label: 'Home', icon: 'home-outline', action: {path: ['/', homePath]}},
    {id: 5, label: 'Sign Out', icon: 'log-out-outline', action: {action: EAction.LOGOUT}},
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
                private authService: AuthService) { }

    ngOnInit() {}

    onClick( item: IMenuItem ) {
        if (item.action.path) {
            debugger;
            this.router.navigate([item.action.path.join(',')]);
        }
        if (item.action.action) {
            if (item.action.action === EAction.LOGOUT) {
                this.authService.onLogout();
                this.router.navigate(['/', homePath]);
            }
        }
    }
}
