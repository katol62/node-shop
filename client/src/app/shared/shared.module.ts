import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from "./components/menu/menu.component";
import {MenuHeaderComponent} from "./components/menu-header/menu-header.component";
import {ToastComponent} from "./components/toast/toast.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {AlertService} from "./services/alert.service";
import {NotificationService} from "./services/notification.service";
import {PersistentService} from "./services/persistent.service";
import {PlaceService} from "./services/place.service";
import {RestService} from "./services/rest.service";
import {ValidationService} from "./services/validation.service";
import {VerificationService} from "./services/verification.service";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {InstaComponent} from "./components/insta/insta.component";
import {SliderComponent} from "./components/slider/slider.component";
import {InstaModalComponent} from "./components/insta-modal/insta-modal.component";
import {HelpService} from "./services/help.service";
import {TranslateModule} from "@ngx-translate/core";
import {LoaderService} from "./services/loader.service";
import {BannerModalComponent} from "./components/banner-modal/banner-modal.component";
import {HomeFooterComponent} from "./components/home-footer/home-footer.component";
import {ProductModalComponent} from "./components/product-modal/product-modal.component";
import {YmapsModalComponent} from "./components/ymaps-modal/ymaps-modal.component";
import {IonicSelectableModule} from "ionic-selectable";
import {RemoteModalComponent} from "./components/remote-modal/remote-modal.component";
import {RemoteModalService} from "./services/remote-modal.service";

@NgModule({
    declarations: [
        MenuComponent,
        MenuHeaderComponent,
        ToastComponent,
        InstaComponent,
        SliderComponent,
        InstaModalComponent,
        BannerModalComponent,
        HomeFooterComponent,
        ProductModalComponent,
        YmapsModalComponent,
        RemoteModalComponent
    ],
    exports: [
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule,
        IonicSelectableModule,
        MenuComponent,
        MenuHeaderComponent,
        ToastComponent,
        InstaComponent,
        SliderComponent,
        InstaModalComponent,
        BannerModalComponent,
        HomeFooterComponent,
        ProductModalComponent,
        YmapsModalComponent,
        RemoteModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        TranslateModule,
        IonicSelectableModule,
        IonicModule
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<any> {
        return {
            ngModule: SharedModule,
            providers: [
                AuthService,
                AlertService,
                NotificationService,
                PersistentService,
                PlaceService,
                RestService,
                ValidationService,
                VerificationService,
                HelpService,
                LoaderService,
                RemoteModalService
            ]
        };
    }

}
