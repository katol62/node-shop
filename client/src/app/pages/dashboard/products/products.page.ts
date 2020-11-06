import {Component, Injector, OnInit} from '@angular/core';
import {ICategory} from "../../../../../../server/src/models/Category";
import {IBaseResponse, IProduct, IProductRequest} from "../../../shared/misc/http-data";
import {RootComponent} from "../../../shared/components/root/root.component";
import {RestService} from "../../../shared/services/rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {InstaModalComponent} from "../../../shared/components/insta-modal/insta-modal.component";
import {ModalController} from "@ionic/angular";
import {ProductModalComponent} from "../../../shared/components/product-modal/product-modal.component";

@Component({
    selector: 'app-products',
    templateUrl: './products.page.html',
    styleUrls: ['./products.page.scss'],
})
export class ProductsPage extends RootComponent implements OnInit {

    public categories: ICategory[] = [];
    public products: IProduct[] = [];
    public id: number;
    public title: string;

    public selectedCategories: number[] = [];

    constructor(
        protected injector: Injector,
        private restService: RestService,
        private sanitizer : DomSanitizer,
        private modalController: ModalController,
        private route: ActivatedRoute
    ) {
        super(injector);
        this.route.queryParams.subscribe(params => {
            if (this.router.getCurrentNavigation().extras.state) {
                const e = this.router.getCurrentNavigation().extras;
                const id = this.router.getCurrentNavigation().extras.state.id;
                this.selectedCategories.push(id);
            }
        });
    }

    ngOnInit() {
    }

    protected afterInit(): void {
    }

    ionViewWillEnter(): void {
        this.translate.get(['HOME.title', 'PRODUCTS.title']).subscribe({
            next: (value: any) => {
                this.title = `${value['HOME.title']} / ${value['PRODUCTS.title']}`;
            },
            error: err => {
                console.log(err);
            }
        })
        this.getCategories();
    }

    /**
     * Rest
     */

    private getCategories(): void {
        this.restService.get('categories').subscribe({
            next: (result: IBaseResponse) => {
                this.categories = result.data;
                this.getProducts();
            }
        })
    }

    private getProducts(): void {
        const req: any = this.selectedCategories.length ? {category: this.selectedCategories.join(',')} : {};
        this.restService.get('products', req).subscribe({
            next: (result: IBaseResponse) => {
                this.products = result.data;
            }
        })
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


    showDetails( item: IProduct ) {
        this.presentModal(item);
    }

    async presentModal(item: IProduct) {
        const modal = await this.modalController.create({
            component: ProductModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'product': item
            }
        });
        return await modal.present();
    }

}
