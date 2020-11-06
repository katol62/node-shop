import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {adminPath, dashboardPath, profilePath} from "./shared/misc/constants";
import {AuthGuard} from "./shared/guards/auth.guard";
import {RoleGuard} from "./shared/guards/role.guard";

const routes: Routes = [
    {
        path: '',
        redirectTo: dashboardPath,
        pathMatch: 'full'
    },
    {
        path: dashboardPath,
        loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
    },
    {
        path: profilePath,
        loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
    },
    {
        path: adminPath,
        canActivate: [AuthGuard, RoleGuard], data: {roles: ['super', 'admin']},
        loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
