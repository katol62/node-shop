import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';
import {createPath, listPath} from "../../../shared/misc/constants";

const routes: Routes = [
  {
    path: '',
    component: OrdersPage,
    children: [
      {
        path: '',
        redirectTo: listPath
      },
      {
        path: listPath,
        loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
      },
      {
        path: createPath,
        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
