import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.page.html',
    styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {

    constructor(private menu: MenuController) { }

    ngOnInit() {
    }

    openMenu() {
        this.menu.open('left');
    }
}
