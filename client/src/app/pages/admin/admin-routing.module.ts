import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';
import {bannersPath, categoriesPath, detailsPath, ordersPath, productsPath, usersPath} from "../../shared/misc/constants";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: '',
        redirectTo: categoriesPath
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
      },
      {
        path: usersPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: bannersPath,
        loadChildren: () => import('./banners/banners.module').then( m => m.BannersPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
