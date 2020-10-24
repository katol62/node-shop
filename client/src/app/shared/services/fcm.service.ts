import { Injectable } from '@angular/core';
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
    Capacitor
} from '@capacitor/core';
import {IMessageItem, NotificationMessageType, NotificationService} from "./notification.service";

const {PushNotifications} = Plugins;

@Injectable({
    providedIn: 'root'
})
export class FcmService {

    private _token: string;
    get token(): string {
        return this._token;
    }

    constructor(private notificationService: NotificationService) { }

    public initPush(): void {
        if (Capacitor.platform !== 'web') {
            this.registerPush();
        }
    }

    private registerPush() {
        PushNotifications.requestPermission().then((permission) => {
            if (permission.granted) {
                // Register with Apple / Google to receive push via APNS/FCM
                PushNotifications.register();
            } else {
                // No permission for push granted
                const message: IMessageItem = {message: 'Permission not granted', messageCode: 'Error', type: NotificationMessageType.error};
                this.notificationService.show(message);
            }
        });

        PushNotifications.addListener(
            'registration',
            (token: PushNotificationToken) => {
                console.log('My token: ' + JSON.stringify(token));
                this._token = token.value;
            }
        );

        PushNotifications.addListener('registrationError', (error: any) => {
            console.log('Error: ' + JSON.stringify(error));
            const message: IMessageItem = {message: JSON.stringify(error), messageCode: 'Error', type: NotificationMessageType.error};
            this.notificationService.show(message);
        });

        PushNotifications.addListener(
            'pushNotificationReceived',
            async (notification: PushNotification) => {
                console.log('Push received: ' + JSON.stringify(notification));
            }
        );

        PushNotifications.addListener(
            'pushNotificationActionPerformed',
            async (notification: PushNotificationActionPerformed) => {
                const data = notification.notification.data;
                console.log('Action performed: ' + JSON.stringify(notification.notification));
            }
        );
    }

    public resetBadgeCount() {
        PushNotifications.removeAllDeliveredNotifications();
    }
}
