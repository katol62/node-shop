import { Component } from '@angular/core';
import {profilePath} from "../../shared/misc/constants";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    public profilePath = profilePath;

    constructor() {}

}
