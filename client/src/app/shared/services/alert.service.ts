import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";

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

    constructor(private alertController: AlertController) { }

    async confirm(title: string, message: string, data: any): Promise<any> {
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: title,
                message: message,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                            console.log('Confirm Cancel');
                            resolve(null);
                        }
                    }, {
                        text: 'Ok',
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
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                cssClass: 'my-custom-class',
                header: title,
                message: message,
                buttons: [
                    {
                        text: 'OK',
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
