import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesListPage } from './addresses-list.page';

const routes: Routes = [
  {
    path: '',
    component: AddressesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressesListPageRoutingModule {}
