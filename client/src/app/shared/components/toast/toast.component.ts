import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../services/notification.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    constructor(public toastController: ToastController,
                private zone: NgZone,
                private translate: TranslateService,
                private notificationService: NotificationService
    ) { }

    ngOnInit() {
        this.subscription = this.notificationService.notification$.subscribe((message: IMessageItem) => {
            this.zone.run( () => {
                    this.openToast(message).then(r => console.log('toast open'));
                }
            );
        });
    }

    ngOnDestroy(): void {
    }

    private async openToast( message: IMessageItem ): Promise<any> {

        const text = await this.translate.get(message.message).toPromise();
        const headerError = await this.translate.get('GLOBAL.alert.error').toPromise();
        const headerWarning = await this.translate.get('GLOBAL.alert.warning').toPromise();
        const headerInfo = await this.translate.get('GLOBAL.alert.info').toPromise();

        const toast = await this.toastController.create({
            header: message.type === NotificationMessageType.error ? headerError : (message.type === NotificationMessageType.warning ? headerWarning : headerInfo),
            color: message.type === NotificationMessageType.error ? 'danger' : (message.type === NotificationMessageType.warning ? 'warning' : 'success'),
            message: text,
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }
}
