import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesPage } from './addresses.page';
import {createPath, listPath} from "../../../shared/misc/constants";

const routes: Routes = [
    {
        path: '',
        component: AddressesPage,
        children: [
            {
                path: '',
                redirectTo: listPath
            },
            {
                path: listPath,
                loadChildren: () => import('./addresses-list/addresses-list.module').then( m => m.AddressesListPageModule)
            },
            {
                path: createPath,
                loadChildren: () => import('./addresses-edit/addresses-edit.module').then( m => m.AddressesEditPageModule)
            },
            {
                path: ':id',
                loadChildren: () => import('./addresses-edit/addresses-edit.module').then( m => m.AddressesEditPageModule)
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddressesPageRoutingModule {}
