import { Injectable } from '@angular/core';
import {Platform} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class HelpService {

    constructor(private platform: Platform) { }

    public isMobile(): boolean {
        return (this.platform.platforms().indexOf('ios') !== -1 || this.platform.platforms().indexOf('android') !== -1)
    }

}
