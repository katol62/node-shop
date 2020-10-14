import { Component, OnInit } from '@angular/core';
import {adminPath, createPath, productsPath} from "../../../../shared/misc/constants";

@Component({
    selector: 'app-list',
    templateUrl: './list.page.html',
    styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

    public title: string = 'Products List';
    public link: string = '/' + adminPath + '/' + productsPath + '/' + createPath;

    constructor() { }

    ngOnInit() {
    }

}
