import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesEditPage } from './addresses-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AddressesEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressesEditPageRoutingModule {}
