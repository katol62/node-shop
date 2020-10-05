import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import {categoriesPath, detailsPath, ordersPath, productsPath, usersPath} from "../../shared/misc/constants";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        redirectTo: usersPath
      },
      {
        path: usersPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: categoriesPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
      },
      {
        path: productsPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      },
      {
        path: ordersPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
