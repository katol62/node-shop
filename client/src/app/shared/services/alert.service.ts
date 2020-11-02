import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {TranslateService} from "@ngx-translate/core";

export enum EConfirmAction {
    DELETE= 'delete'
}

export interface ConfirmData {
    action?: EConfirmAction;
    data?: any;
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private alertController: AlertController,
                private translate: TranslateService) { }

    async confirm(title: string, message: string, data: any): Promise<any> {

        const newTitle = await this.translate.get(title).toPromise();
        const newMessage = await this.translate.get(message).toPromise();
        const cancel = await this.translate.get('GLOBAL.alert.cancel').toPromise();
        const ok = await this.translate.get('GLOBAL.alert.ok').toPromise();

        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: newTitle,
                message: newMessage,
                buttons: [
                    {
                        text: cancel,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Confirm Cancel');
                            resolve(null);
                        }
                    }, {
                        text: ok,
                        handler: () => {
                            console.log('Confirm Ok');
                            resolve(data);
                        }
                    }
                ]
            });
            await alert.present();
        });
    }

    async alert(title: string, message: string): Promise<any> {

        const newTitle = await this.translate.get(title).toPromise();
        const newMessage = await this.translate.get(message).toPromise();
        const ok = await this.translate.get('GLOBAL.alert.ok').toPromise();

        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: newTitle,
                message: newMessage,
                buttons: [
                    {
                        text: ok,
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Alert Ok');
                            resolve(null);
                        }
                    }
                ]
            });
            await alert.present();
        });
    }
}
