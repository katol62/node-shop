import { Injectable } from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public loading: any;
    public isShowing: boolean;

    constructor(private loadingController: LoadingController,
                private translate: TranslateService) { }

    async loadingPresent(): Promise<void> {

        const message = await this.translate.get('GLOBAL.labels.pleaseWait').toPromise();

        if (!this.isShowing) {
            this.isShowing = true;
            this.loading = await this.loadingController.create({
                cssClass: "my-custom-loader-class",
                message: message + "...",
                backdropDismiss: true
            });
            return await this.loading.present();
        } else {
            this.isShowing = true;
        }
    }

    async loadingDismiss(): Promise<void> {
        if (this.loading && this.isShowing) {
            this.isShowing = false;
            await this.loadingController.dismiss();
        }
    }
}
