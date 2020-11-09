import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import ymaps from 'ymaps';
import {LoaderService} from "../../services/loader.service";

export const yMapsUrl = '//api-maps.yandex.ru/2.1/?lang=ru_RU';

@Component({
    selector: 'app-ymaps-modal',
    templateUrl: './ymaps-modal.component.html',
    styleUrls: ['./ymaps-modal.component.scss'],
})
export class YmapsModalComponent implements OnInit {

    private loaded: boolean;
    private map: any;

    @ViewChild("maps", { read: ElementRef })
    private searchbarElem: ElementRef;

    constructor(
        private modalController: ModalController,
        private loaderService: LoaderService) { }

    ngOnInit() {
        this.loadMaps();
    }

    async loadMaps(): Promise<void> {
        await this.loaderService.loadingPresent();
        try {
            const maps = await ymaps.load(yMapsUrl);
            this.map = new maps.Map('maps-container', {
                center: [44.946329, 34.104218],
                zoom: 19
            });
            await this.loaderService.loadingDismiss();
        } catch (e) {
            await this.loaderService.loadingDismiss();
        }
        finally {
            await this.loaderService.loadingDismiss();
        }
    }

    closeModal() {
        this.modalController.dismiss();
    }

}
