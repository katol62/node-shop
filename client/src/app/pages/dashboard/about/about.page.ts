import {Component, Injector, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {MENU_HOME_ID} from "../../../shared/components/menu/menu.component";
import {RootComponent} from "../../../shared/components/root/root.component";

@Component({
    selector: 'app-about',
    templateUrl: './about.page.html',
    styleUrls: ['./about.page.scss'],
})
export class AboutPage extends RootComponent implements OnInit {

    public menuId: string = MENU_HOME_ID;
    public title: string;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ionViewWillEnter() {
        this.translate.get(['HOME.title', 'ABOUT.title']).subscribe({
            next: (value: any) => {
                this.title = `${value['HOME.title']} / ${value['ABOUT.title']}`;
            },
            error: err => {
                console.log(err);
            }
        })

    }

    protected afterInit(): void {
    }

}
