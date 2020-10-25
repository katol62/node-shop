import * as firebase from 'firebase-admin'
import * as serviceAccount from "../../firebase/herenotthere-e0128-75d62cc092b0.json";

export interface INotification {
    title: string;
    body: string;
}

export interface IMessage {
    notification: INotification
}

export class FirebaseAdmin {

    public admin = firebase;
    private params = {
        type: serviceAccount.type,
        projectId: serviceAccount.project_id,
        privateKeyId: serviceAccount.private_key_id,
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email,
        clientId: serviceAccount.client_id,
        authUri: serviceAccount.auth_uri,
        tokenUri: serviceAccount.token_uri,
        authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
        clientC509CertUrl: serviceAccount.client_x509_cert_url
    }

    constructor() {
        this.admin.initializeApp(this.params);
    }

}
