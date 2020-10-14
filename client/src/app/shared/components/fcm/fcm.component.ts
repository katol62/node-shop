import { Component, OnInit } from '@angular/core';
import {Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed} from "@capacitor/core";

const {PushNotifications} = Plugins;

export const FCM_REGISTRATION = 'registration';
export const FCM_REGISTRATION_ERROR = 'registrationError';
export const FCM_NOTIFICATION_RECEIVED = 'pushNotificationReceived';
export const FCM_NOTIFICATION_PERFORMED = 'pushNotificationActionPerformed';

@Component({
    selector: 'app-fcm',
    templateUrl: './fcm.component.html',
    styleUrls: ['./fcm.component.scss'],
})
export class FcmComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // this.initPushNotifications();
    }

    private initPushNotifications(): void {
        PushNotifications.requestPermission().then( result => {
            if (result.granted) {
                PushNotifications.register();
            } else {

            }
        });

        PushNotifications.addListener(FCM_REGISTRATION, (token : PushNotificationToken) => {
            console.log('TOKEN: ' + token.value);
        });
        PushNotifications.addListener(FCM_REGISTRATION_ERROR, (error: any) => {
            console.log('REG ERROR: ' + JSON.stringify(error));
        });
        PushNotifications.addListener(FCM_NOTIFICATION_RECEIVED, (notification: PushNotification) => {
            console.log('PUSH RECEIVED: ' + JSON.stringify(notification));
        });
        PushNotifications.addListener(FCM_NOTIFICATION_PERFORMED, (notification: PushNotificationActionPerformed) => {
            console.log('PUSH ACTION PERFORMED: ' + JSON.stringify(notification));
        });
    }


}
