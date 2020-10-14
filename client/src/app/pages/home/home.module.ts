import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {IonicModule} from "@ionic/angular";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomePageRoutingModule,
    IonicModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
