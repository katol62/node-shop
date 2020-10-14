import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { UsersListPageRoutingModule } from './users-list-routing.module';

import { UsersListPage } from './users-list.page';
import {MenuHeaderComponent} from "../../../../shared/components/menu-header/menu-header.component";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        UsersListPageRoutingModule
    ],
    exports: [
    ],
    declarations: [UsersListPage]
})
export class UsersListPageModule {}
