import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import ymaps from 'ymaps';

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

    constructor(private modalController: ModalController) { }

    ngOnInit() {
        this.loadMaps();
    }

    loadMaps(): void {

        if (this.loaded) {
            return;
        }
        ymaps.load('//api-maps.yandex.ru/2.1/?lang=ru_RU').then(
            maps => {
                const map = new maps.Map('maps-container', {
                    center: [44.946329, 34.104218],
                    zoom: 18
                });
                this.loaded = true;
            }
        )
            .catch( error => {
                console.log(error);
            })
    }

    closeModal() {
        this.modalController.dismiss();
    }

}
