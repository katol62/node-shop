import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {adminPath, categoriesPath, createPath, productsPath} from "../../../../shared/misc/constants";
import {AuthorizedComponent} from "../../../../shared/components/authorized/authorized.component";
import {RestService} from "../../../../shared/services/rest.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AlertService} from "../../../../shared/services/alert.service";
import {IBaseRequest, IBaseResponse, IProduct, IProductRequest} from "../../../../shared/misc/http-data";
import {ICategory} from "../../../../../../../server/src/models/Category";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage extends AuthorizedComponent implements OnInit, OnDestroy {

    public title: string = 'Products List';
    public link: string = '/' + adminPath + '/' + productsPath + '/' + createPath;

    public products: IProduct[] = [];
    public categories: ICategory[] = [];
    public selectedCategories: number[] = [];

    constructor(
        protected injector: Injector,
        private restService: RestService,
        private sanitizer : DomSanitizer,
        private alertService: AlertService
    )
    {
        super(injector);
    }

    ngOnInit() {
        super.ngOnInit();
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
    private getProducts(): void {
        const req: IProductRequest = this.selectedCategories.length ? {category: this.selectedCategories.join(',')} : {};
        this.restService.get('products', req).subscribe({
            next: (result: IBaseResponse) => {
                this.products = result.data;
            }
        })

    }

    private getCategories() {
        const req: any = {all: true};
        this.restService.get('categories', req).subscribe({
            next: ((result: IBaseResponse) => {
                this.categories = result.data;
                this.getProducts();
            })
        })
    }

    private deleteProduct( id: number ) {
        this.restService.delete(`products/${id}`).subscribe({
            next: (value: IBaseResponse ) => {
                this.alertService.alert('Success', value.message).then(
                    result => {
                        this.getProducts();
                    }
                );
            }
        })
    }

    /**
     * Actions
     */

    delete( product: IProduct ) {
        this.alertService.confirm('Confirm', 'Delete product?', {data: product}).then(res => {
            if (res) {
                this.deleteProduct(res.data.id);
            }
        })
    }

    edit( product: IProduct ) {
        this.router.navigate(['/', adminPath, productsPath, product.id]);
    }

    /**
     * Misc
     */

    updateFilter( $event: any ) {
        console.log(this.selectedCategories);
        this.getProducts();
    }

    public getSrc(item: IProduct): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl(item.image1);
    }

}
