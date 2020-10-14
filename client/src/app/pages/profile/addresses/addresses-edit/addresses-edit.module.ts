import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressesEditPageRoutingModule } from './addresses-edit-routing.module';

import { AddressesEditPage } from './addresses-edit.page';
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        AddressesEditPageRoutingModule
    ],
    declarations: [AddressesEditPage]
})
export class AddressesEditPageModule {}
