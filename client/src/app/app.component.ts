import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {TranslateService} from "@ngx-translate/core";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    private defaultTitle = 'Here Not There';

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private translate: TranslateService,
        private titleService: Title
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        this.translate.setDefaultLang('ru');
        this.translate.get('GLOBAL.title').subscribe({
            next: (value) => {
                this.titleService.setTitle(value);
            },
            error: err => {
                this.titleService.setTitle(this.defaultTitle);
            }
        });

    }
}
