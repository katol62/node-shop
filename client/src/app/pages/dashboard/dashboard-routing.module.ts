import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {aboutPath, categoryPath, homePath, productsPath} from "../../shared/misc/constants";
import {DashboardPage} from "./dashboard.page";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: '',
        redirectTo: homePath,
        pathMatch: 'full'
      },
      {
        path: homePath,
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: aboutPath,
        loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: productsPath,
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
