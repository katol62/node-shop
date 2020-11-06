import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IBanner, IProduct} from "../../misc/http-data";
import {DomSanitizer} from "@angular/platform-browser";
import {IonSlides, ModalController} from "@ionic/angular";
import {ISlider} from "../slider/slider.component";

@Component({
    selector: 'app-product-modal',
    templateUrl: './product-modal.component.html',
    styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {

    @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
    public slider: ISlider;

    public slideOpts = {
        initialSlide: 0,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        spaceBetween: 20,
        // autoplay: true
    };

    private _product: IProduct;
    @Input('product')
    public get product(): IProduct {
        return this._product;
    }
    public set product(item: IProduct) {
        this._product = item;
        let result = [];
        Object.entries(this._product)
            .filter(([key, value]) =>(key.indexOf('image') !== -1 && value !== null))
            .forEach(([,value]) => result.push(value));
        this.initSlider(result);
    }

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

    public getSrc(src: string): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(src);
    }

    /**
     * Slider
     */

    private initSlider(items: any): void {
        this.slider = {
            isBeginningSlide: true,
            isEndSlide: false,
            slidesItems: items
        }
    }


    //Move to Next slide
    slideNext(object, slideView) {
        slideView.slideNext(500).then(() => {
            this.checkIfNavDisabled(object, slideView);
        });
    }

    //Move to previous slide
    slidePrev(object, slideView) {
        slideView.slidePrev(500).then(() => {
            this.checkIfNavDisabled(object, slideView);
        });;
    }

    //Method called when slide is changed by drag or navigation
    SlideDidChange(object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    }

    //Call methods to check if slide is first or last to enable disbale navigation
    checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
            object.isBeginningSlide = istrue;
        });
    }
    checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
            object.isEndSlide = istrue;
        });
    }



}
