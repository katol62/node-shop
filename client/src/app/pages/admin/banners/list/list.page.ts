import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {adminPath, bannersPath, createPath} from "../../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../../shared/services/rest.service";
import {AlertService} from "../../../../shared/services/alert.service";
import {IBanner, IBannerListRequest, IBaseResponse} from "../../../../shared/misc/http-data";
import {DomSanitizer} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public title: string = '';
    public link: string = '/' + adminPath + '/' + bannersPath + '/' + createPath;

    public banners: IBanner[] = [];

    constructor(
        protected injector: Injector,
        private restService: RestService,
        private sanitizer : DomSanitizer,
        private translate: TranslateService,
        private alertService: AlertService
    )
    {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
        this.translate.get('ADMIN.banners.title').subscribe({
            next: (value: string) => {
                this.title = value;
            }
        })
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }

    protected afterInit(): void {
    }

    ionViewWillEnter() {
        this.getBanners();
    }

    /**
     * Rest
     */

    private getBanners() {
        const req: IBannerListRequest = {all: true};
        this.restService.get('banners', req).subscribe({
            next: ((result: IBaseResponse) => {
                // this.banners = result.data.map( (banner: IBanner) => ({...banner, src: btoa(String.fromCharCode(...new Uint8Array(banner.image.data)))}) );
                this.banners = result.data;
            })
        })
    }

    private deleteBanner( id: number ) {
        this.restService.delete(`banners/${id}`).subscribe({
            next: (value: IBaseResponse ) => {
                this.alertService.alert('Success', 'Banner deleted').then(
                    result => {
                        this.getBanners();
                    }
                );
            }
        })
    }

    /**
     * Actions
     */

    public delete( banner: IBanner ) {
        this.alertService.confirm('Confirm', 'Delete banner?', {data: banner}).then(res => {
            if (res) {
                this.deleteBanner(res.data.id);
            }
        })
    }

    public edit( banner: IBanner ) {
        this.router.navigate(['/', adminPath, bannersPath, banner.id]);
    }


    /**
     * Misc
     */


    public getSrc(item: IBanner): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(item.src);
    }

}
