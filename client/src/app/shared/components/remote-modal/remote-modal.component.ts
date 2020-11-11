import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {ModalController} from "@ionic/angular";

@Component({
    selector: 'app-remote-modal',
    templateUrl: './remote-modal.component.html',
    styleUrls: ['./remote-modal.component.scss'],
})
export class RemoteModalComponent implements OnInit {

    @Input()
    public title: string = '';

    @Input()
    public url: string = '';

    public urlSafe: SafeResourceUrl;

    @ViewChild('content', {static: false})
    public contentRef: ElementRef;

    constructor(
        public sanitizer: DomSanitizer,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    }

    closeModal() {
        this.modalController.dismiss();
    }

}
