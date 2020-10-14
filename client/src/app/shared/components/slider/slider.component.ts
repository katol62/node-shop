import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from "@ionic/angular";
import {IBanner, IBaseResponse} from "../../misc/http-data";
import {DomSanitizer} from "@angular/platform-browser";
import {RestService} from "../../services/rest.service";

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

    @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
    public slider: any;

    public slideOpts = {
        initialSlide: 0,
        slidesPerView: 1,
        loop: true,
        centeredSlides: true,
        spaceBetween: 20,
        // autoplay: true
    };

    public banners: IBanner[] = [];

    constructor(
        private sanitizer : DomSanitizer,
        private restService: RestService
    ) {
    }

    ngAfterViewInit(): void {
        this.getBanners();
    }

    ngOnInit() {}

    private initSlider(): void {
        this.slider = {
            isBeginningSlide: true,
            isEndSlide: false,
            slidesItems: this.banners
        }
    }

    /**
     * Rest
     */

    private getBanners(): void {
        this.restService.get('banners').subscribe({
            next: ((result: IBaseResponse) => {
                this.banners = result.data;
                this.initSlider();
            })
        })
    }

    /**
     * Slider
     */

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

    /**
     * Misc
     */


    public getSrc(item: IBanner): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(item.src);
    }
}
