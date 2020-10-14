import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { BannersPageRoutingModule } from './banners-routing.module';

import { BannersPage } from './banners.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    BannersPageRoutingModule
  ],
  declarations: [BannersPage]
})
export class BannersPageModule {}
