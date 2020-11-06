import {Component, Injector, OnInit} from '@angular/core';
import {profilePath} from "../../../shared/misc/constants";
import {MENU_HOME_ID} from "../../../shared/components/menu/menu.component";
import {TranslateService} from "@ngx-translate/core";
import {RootComponent} from "../../../shared/components/root/root.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage extends RootComponent implements OnInit {

    public profilePath = profilePath;
    public link: string = `/${profilePath}`;
    public title: string;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ionViewWillEnter() {
        this.translate.get('HOME.title').subscribe({
            next: (value: string) => {
                this.title = value;
            }
        })
    }

    protected afterInit(): void {
    }

}
