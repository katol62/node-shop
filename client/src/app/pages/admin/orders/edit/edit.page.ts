import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.page.html',
    styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

    public title: string = 'Edit Order';

    constructor() { }

    ngOnInit() {
    }

}
