import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {profilePath} from "../../../shared/misc/constants";
import {RootComponent} from "../../../shared/components/root/root.component";
import {InstaComponent} from "../../../shared/components/insta/insta.component";
import {SliderComponent} from "../../../shared/components/slider/slider.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage extends RootComponent implements OnInit {

    @ViewChild(InstaComponent) insta: InstaComponent;
    @ViewChild(SliderComponent) slider: SliderComponent;

    public profilePath = profilePath;
    public link: string = `/${profilePath}`;
    public title: string;

    constructor(protected injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ionViewWillEnter() {
        this.translate.get('HOME.title').subscribe({
            next: (value: string) => {
                this.title = value;
            }
        })
    }

    protected afterInit(): void {
    }

    doRefresh( $event: any ) {
        this.slider.refresh();
        this.insta.refresh();
        setTimeout(() => {
            console.log('Async operation has ended');
            $event.target.complete();
        }, 1000);
    }
}
