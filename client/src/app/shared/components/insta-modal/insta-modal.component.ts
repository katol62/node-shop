import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {ModalController} from "@ionic/angular";
import {IBaseResponse, IInstaMedia} from "../../misc/http-data";
import * as moment from 'moment';
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-insta-modal',
    templateUrl: './insta-modal.component.html',
    styleUrls: ['./insta-modal.component.scss'],
})
export class InstaModalComponent implements OnInit {

    @Input('mediaId')
    public set mediaId(id: string) {
        this.getMediaDetails(id);
    }

    public mediaData: IInstaMedia;

    constructor(
        private restService: RestService,
        private sanitizer : DomSanitizer,
        private translate: TranslateService,
        private modalController: ModalController) { }

    ngOnInit() {
        const locale = this.translate.getDefaultLang();
        moment.locale(locale);
    }

    private getMediaDetails(id: string): void {
        this.restService.get(`insta/${id}`).subscribe({
            next: (result: IBaseResponse) => {
                this.mediaData = {...result.data, media_url: (result.data.media_url ? result.data.media_url.replace('https:', '') : null)};
            }
        })
    }

    closeModal() {
        this.modalController.dismiss();
    }

    modalTitle(): string {
        return `${moment(this.mediaData.timestamp).format('LLLL')}`
    }

    public getSrc(url: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }


    goto( mediaData: IInstaMedia ) {
        window.open(mediaData.permalink, '_blank');
    }
}
