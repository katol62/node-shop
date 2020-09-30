import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';
import {addressesPath, detailsPath, loginPath, profilePath, registerPath} from "../../shared/misc/constants";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: '',
        redirectTo: detailsPath
      },
      {
        path: loginPath,
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: registerPath,
        loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: detailsPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
      },
      {
        path: addressesPath,
        canActivate: [AuthGuard],
        loadChildren: () => import('./addresses/addresses.module').then( m => m.AddressesPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
