import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {adminPath, categoriesPath, createPath} from "../../../../shared/misc/constants";
import {IBaseResponse} from "../../../../shared/misc/http-data";
import {RestService} from "../../../../shared/services/rest.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AlertService} from "../../../../shared/services/alert.service";
import {ICategory} from "../../../../../../../server/src/models/Category";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public title: string = '';
    public link: string = '/' + adminPath + '/' + categoriesPath + '/' + createPath;

    public categories: ICategory[] = [];

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
        this.translate.get('ADMIN.categories.title').subscribe({
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
        this.getCategories();
    }

    /**
     * Rest
     */

    private getCategories() {
        const req: any = {all: true};
        this.restService.get('categories', req).subscribe({
            next: ((result: IBaseResponse) => {
                this.categories = result.data;
            })
        })
    }

    private deleteCategory( id: number ) {
        this.restService.delete(`categories/${id}`).subscribe({
            next: (value: IBaseResponse ) => {
                this.alertService.alert('Success', 'Category deleted').then(
                    result => {
                        this.getCategories();
                    }
                );
            }
        })
    }

    /**
     * Actions
     */

    public delete( category: ICategory ) {
        this.alertService.confirm('Confirm', 'Delete category?', {data: category}).then(res => {
            if (res) {
                this.deleteCategory(res.data.id);
            }
        })
    }

    public edit( category: ICategory ) {
        this.router.navigate(['/', adminPath, categoriesPath, category.id]);
    }


    /**
     * Misc
     */


    public getSrc(item: ICategory): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(item.src);
    }

}
