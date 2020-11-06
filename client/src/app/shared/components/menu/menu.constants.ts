import {aboutPath, adminPath, bannersPath, categoriesPath, dashboardPath, homePath, listPath, notificationsPath, productsPath, usersPath} from "../../misc/constants";

export enum EAction {
    LOGOUT = 'logout'
}

export interface IMenuAction {
    path?: string;
    action?: EAction;
    data?: any;
}

export interface IMenuItem {
    id: number;
    label: string;
    key?: string;
    icon: string;
    action: IMenuAction;
}

export const menu: IMenuItem[] = [
    {id: 0, label: 'Home', key: 'ADMIN.menu.home', icon: 'home-outline', action: {path: `/${dashboardPath}`}},
    {id: 1, label: 'Categories', key: 'ADMIN.menu.categories', icon: 'list-outline', action: {path: '/' + adminPath + '/' + categoriesPath + '/' + listPath}},
    {id: 2, label: 'Products', key: 'ADMIN.menu.products', icon: 'layers-outline', action: {path: '/' + adminPath + '/' + productsPath + '/' + listPath}},
    // {id: 3, label: 'Orders', key: 'ADMIN.menu.orders', icon: 'cart-outline', action: {path: '/' + adminPath + '/' + categoriesPath + '/' + listPath}},
    {id: 4, label: 'Users', key: 'ADMIN.menu.users', icon: 'people-outline', action: {path: '/' + adminPath + '/' + usersPath + '/' + listPath}},
    {id: 5, label: 'Banners', key: 'ADMIN.menu.banners', icon: 'image-outline', action: {path: '/' + adminPath + '/' + bannersPath + '/' + listPath}},
    {id: 6, label: 'Notifications', key: 'ADMIN.menu.notifications', icon: 'chatbubble-ellipses-outline', action: {path: '/' + adminPath + '/' + notificationsPath}},
]

export const homeMenu: IMenuItem[] = [
    {id: 0, label: 'Home', key: 'ADMIN.menu.home', icon: 'home-outline', action: {path: `/${dashboardPath}`}},
    {id: 1, label: 'Home', key: 'ABOUT.title', icon: 'help-circle-outline', action: {path: `/${dashboardPath}/${aboutPath}`}},
]
