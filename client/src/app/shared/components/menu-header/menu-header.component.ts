import {Component, Input, OnInit} from '@angular/core';
import {MenuController} from "@ionic/angular";
import {MENU_ID} from "../menu/menu.component";
import {Router} from "@angular/router";

@Component({
    selector: 'app-menu-header',
    templateUrl: './menu-header.component.html',
    styleUrls: ['./menu-header.component.scss'],
})
export class MenuHeaderComponent implements OnInit {

    @Input()
    public title: string = '';
    @Input()
    public link: string;

    constructor(
        private menu: MenuController,
        private router: Router
    ) { }

    ngOnInit() {}

    openMenu() {
        this.menu.open(MENU_ID);
    }

    rightButtonClick() {
        this.router.navigateByUrl(this.link);
    }
}