import {Component, OnInit} from '@angular/core';
import {profilePath} from "../../shared/misc/constants";
import {homeMenu} from "../../shared/components/menu/menu.constants";
import {MenuController} from "@ionic/angular";
import {MENU_ADMIN_ID, MENU_HOME_ID} from "../../shared/components/menu/menu.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public homeMenu = homeMenu;
    public menuId = MENU_HOME_ID;
    public profilePath = profilePath;

    constructor(private menuController: MenuController,
                private translate: TranslateService) {
    }

    ngOnInit(): void {
    }

    openMenu() {
        this.menuController.enable(true, this.menuId).then(
            res => {
                this.menuController.open(this.menuId);
            }
        );
    }
}
