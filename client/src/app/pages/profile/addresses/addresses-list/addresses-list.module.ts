import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressesListPageRoutingModule } from './addresses-list-routing.module';

import { AddressesListPage } from './addresses-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressesListPageRoutingModule
  ],
  declarations: [AddressesListPage]
})
export class AddressesListPageModule {}
