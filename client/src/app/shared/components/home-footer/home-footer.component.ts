import { Component, OnInit } from '@angular/core';
import {InstaModalComponent} from "../insta-modal/insta-modal.component";
import {ModalController} from "@ionic/angular";
import {YmapsModalComponent} from "../ymaps-modal/ymaps-modal.component";

@Component({
    selector: 'app-home-footer',
    templateUrl: './home-footer.component.html',
    styleUrls: ['./home-footer.component.scss'],
})
export class HomeFooterComponent implements OnInit {

    constructor(
        private modalController: ModalController
    ) { }

    ngOnInit() {}

    toggleText(): void {
        this.presentModal();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: YmapsModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'mediaId': 1
            }
        });
        return await modal.present();
    }


}
