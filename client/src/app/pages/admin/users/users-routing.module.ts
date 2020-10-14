import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersPage } from './users.page';
import {listPath} from "../../../shared/misc/constants";
import {AuthGuard} from "../../../shared/guards/auth.guard";
import {RoleGuard} from "../../../shared/guards/role.guard";

const routes: Routes = [
  {
    path: '',
    component: UsersPage,
    children: [
      {
        path: '',
        redirectTo: listPath
      },
      {
        path: listPath,
        loadChildren: () => import('./users-list/users-list.module').then( m => m.UsersListPageModule)
      },
      {
        path: ':id',
        canActivate: [AuthGuard, RoleGuard], data: {roles: ['super']},
        loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
