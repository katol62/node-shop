import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {IBanner, IBaseResponse, IInstaMedia} from "../../misc/http-data";
import {IonInfiniteScroll, ModalController} from "@ionic/angular";
import {InstaModalComponent} from "../insta-modal/insta-modal.component";
import {DomSanitizer} from "@angular/platform-browser";

export type InstaType = 'list' | 'grid';

@Component({
    selector: 'app-insta',
    templateUrl: './insta.component.html',
    styleUrls: ['./insta.component.scss'],
})
export class InstaComponent implements OnInit {

    public type: InstaType = 'grid';

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    public instaItems: IInstaMedia[] = [];
    public instaRawItems: IInstaMedia[];

    delta: number = 4;

    constructor(
        private restService: RestService,
        private sanitizer : DomSanitizer,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.getItems();
    }

    ngAfterViewInit(): void {
        this.getItems();
    }

    private getItems(): void {
        this.restService.get('insta').subscribe({
            next: (response: IBaseResponse) => {
                this.instaItems = [];
                this.instaRawItems = [];
                // this.instaRawItems = response.data.data.filter((item: IInstaMedia) => item.media_type !== 'VIDEO');
                this.instaRawItems = response.data.data;
                this.appendItems();
            }
        })
    }

    private appendItems(): void {
        const delta = this.instaItems.length + this.delta < this.instaRawItems.length ? this.instaItems.length + this.delta : this.instaRawItems.length;
        const sliced = this.instaRawItems.slice(this.instaItems.length, delta).map(item => ({...item, media_url: (item.media_url ? item.media_url.replace('https:', '') : null), thumbnail_url: (item.thumbnail_url ? item.thumbnail_url.replace('https:', '') : null)}));
        this.instaItems.push(...sliced);
    }

    updateData( event: any ) {
        this.appendItems();
        setTimeout(() => {
            console.log('Done');
            event.target.complete();

            if (this.instaItems.length == this.instaRawItems.length) {
                event.target.disabled = true;
            }
        }, 3000);
    }



    async presentModal(id: string) {
        const modal = await this.modalController.create({
            component: InstaModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'mediaId': id
            }
        });
        return await modal.present();
    }

    showDetails( item: IInstaMedia ) {
        this.presentModal(item.id)
    }
    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        }).then(r => {});
    }

    public getSrc(url: string): any {
        return this.sanitizer.bypassSecurityTrustUrl(url);
    }


}
