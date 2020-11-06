import {Component, Input, OnInit} from '@angular/core';
import {IBanner} from "../../misc/http-data";
import {ModalController} from "@ionic/angular";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-banner-modal',
    templateUrl: './banner-modal.component.html',
    styleUrls: ['./banner-modal.component.scss'],
})
export class BannerModalComponent implements OnInit {

    @Input()
    public banner: IBanner;

    constructor(
        private sanitizer : DomSanitizer,
        private modalController: ModalController) { }

    ngOnInit() {}

    closeModal() {
        this.modalController.dismiss();
    }

    /**
     * Misc
     */


    public getSrc(item: IBanner): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(item.src);
    }

}
