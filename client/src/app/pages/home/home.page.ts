import {Component, OnInit} from '@angular/core';
import {profilePath} from "../../shared/misc/constants";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public profilePath = profilePath;

    constructor() {
    }

    ngOnInit(): void {
    }

}
