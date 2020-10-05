import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import {MenuComponent} from "../../shared/components/menu/menu.component";
import {MenuHeaderComponent} from "../../shared/components/menu-header/menu-header.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AdminPageRoutingModule
    ],
    exports: [
        MenuComponent
    ],
    declarations: [AdminPage, MenuComponent]
})
export class AdminPageModule {}
