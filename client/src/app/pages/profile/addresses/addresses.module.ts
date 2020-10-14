import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressesPageRoutingModule } from './addresses-routing.module';

import { AddressesPage } from './addresses.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        AddressesPageRoutingModule
    ],
    declarations: [AddressesPage]
})
export class AddressesPageModule {}
