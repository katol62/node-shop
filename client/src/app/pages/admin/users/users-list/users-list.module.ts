import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersListPageRoutingModule } from './users-list-routing.module';

import { UsersListPage } from './users-list.page';
import {MenuHeaderComponent} from "../../../../shared/components/menu-header/menu-header.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UsersListPageRoutingModule
    ],
    exports: [
        MenuHeaderComponent
    ],
    declarations: [UsersListPage, MenuHeaderComponent]
})
export class UsersListPageModule {}
