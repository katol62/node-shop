import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ToastController} from "@ionic/angular";
import {Subscription} from "rxjs";
import {IMessageItem, NotificationMessageType, NotificationService} from "../../services/notification.service";

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {

    private subscription: Subscription;

    constructor(public toastController: ToastController,
                private zone: NgZone,
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
        const toast = await this.toastController.create({
            header: message.type === NotificationMessageType.error ? 'Error' : (message.type === NotificationMessageType.warning ? 'Warning' : 'Info'),
            color: message.type === NotificationMessageType.error ? 'danger' : (message.type === NotificationMessageType.warning ? 'warning' : 'success'),
            message: message.message,
            position: 'top',
            duration: 2000
        });
        await toast.present();
    }
}
