import { Injectable } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {RemoteModalComponent} from "../components/remote-modal/remote-modal.component";
import {TranslateService} from "@ngx-translate/core";

export enum ERemoteType {
    REMOTE_TERMS,
    REMOTE_RULES
}

export interface IRemote {
    type: ERemoteType,
    title: string;
    url: string;
    code: string;
}

const Remotes: IRemote[] = [
    {
        type: ERemoteType.REMOTE_TERMS,
        title: 'Terms & Conditions',
        code: 'GLOBAL.labels.terms',
        url: './assets/docs/terms.html'
    },
    {
        type: ERemoteType.REMOTE_RULES,
        title: 'Official Rules',
        code: 'GLOBAL.labels.rules',
        url: './assets/docs/rules.html'
    }
]

@Injectable({
    providedIn: 'root'
})
export class RemoteModalService {

    constructor(
        private modalController: ModalController,
        private translate: TranslateService
    ) { }

    async presentModal(t: ERemoteType) {
        const remote: IRemote = this.getState(t);
        const translated = await this.translate.get(remote.code).toPromise();
        const modal = await this.modalController.create({
            component: RemoteModalComponent,
            cssClass: 'my-custom-class',
            componentProps: {
                'title': translated ? translated : remote.title,
                'url': remote.url
            }
        });
        return await modal.present();
    }

    private getState(type: ERemoteType): IRemote {
        return Remotes.find((r: IRemote) => r.type === type);
    }

}
