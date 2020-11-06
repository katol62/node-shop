import { Component, OnInit } from '@angular/core';
import {homeMenu, IMenuItem} from "../../shared/components/menu/menu.constants";
import {MENU_HOME_ID} from "../../shared/components/menu/menu.component";
import {RestService} from "../../shared/services/rest.service";
import {IBaseResponse} from "../../shared/misc/http-data";
import {ICategory} from "../../../../../server/src/models/Category";
import {dashboardPath, productsPath} from "../../shared/misc/constants";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    public menuId: string = MENU_HOME_ID;
    public menuDashboard: IMenuItem[] = [];

    constructor(private restService: RestService) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.getCategories();
    }

    private addCategories(categories: ICategory[]): void {
        let menu = homeMenu;
        if (categories.length) {
            const item: IMenuItem = {
                id: 1,
                label: 'All products',
                key: 'PRODUCTS.title',
                icon: 'images-outline',
                action: {path: `/${dashboardPath}/${productsPath}`}
            };
            menu.push(item);
        }
        categories.forEach( (category: ICategory) => {
            const item: IMenuItem = {
                id: 1,
                label: category.name,
                icon: 'image-outline',
                action: {path: `/${dashboardPath}/${productsPath}`, data: {id: category.id}}
            };
            menu.push(item);
        })
        this.menuDashboard = [...menu];
    }

    /**
     * Rest
     */
    private getCategories() {
        const req: any = {};
        this.restService.get('categories', req).subscribe({
            next: ((result: IBaseResponse) => {
                const categories = result.data.filter(item => item.display === 1);
                this.addCategories(categories);
            })
        })
    }

}
