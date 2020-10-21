import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { NotificationsPageRoutingModule } from './notifications-routing.module';

import { NotificationsPage } from './notifications.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    NotificationsPageRoutingModule
  ],
  declarations: [NotificationsPage]
})
export class NotificationsPageModule {}
