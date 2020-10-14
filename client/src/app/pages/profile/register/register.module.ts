import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        IonicModule,
        RegisterPageRoutingModule
    ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
