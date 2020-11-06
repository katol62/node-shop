import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HelpService} from "../../services/help.service";
import {TranslateService} from "@ngx-translate/core";
import {MENU_HOME_ID} from "../menu/menu.component";

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss'],
})
export abstract class RootComponent implements OnInit, OnDestroy {

    public menuId: string;

    protected router: Router;
    protected helpService: HelpService;
    protected translate: TranslateService;

    protected constructor(protected injector: Injector) {
        this.router = injector.get(Router);
        this.helpService = injector.get(HelpService);
        this.translate = injector.get(TranslateService);
        this.menuId = MENU_HOME_ID;
    }

    ngOnInit() {
        this.afterInit();
    }

    ngOnDestroy() {}

    protected abstract afterInit(): void;

}
