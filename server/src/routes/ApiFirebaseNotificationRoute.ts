import * as express from "express";
import {FirebaseAdmin, IMessage} from '../misc/FirebaseAdmin';
import {IBaseResponse} from "../misc/db";
import * as admin from "firebase-admin";
import {CODES} from "../misc/codes";

export const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

class ApiFirebaseNotificationRoute {
    public router: express.Router = express.Router();
    private admin = new FirebaseAdmin().admin;

    constructor() {
        this.config();
    }


    private config() {
        this.router.put('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Method not allowed', code: CODES.methodNotAllowed});
            }
        );
        this.router.get('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed });
            }
        );
        this.router.delete('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed });
            }
        );
        this.router.post('/', async (req: express.Request, res: express.Response) => {
            try {
                const token = req.body.data && req.body.data.token ? req.body.data.token : null;
                const message: any = req.body.data.message;
                let result;
                if (token) {
                    result = await this.admin.messaging().sendToDevice(token, message, notification_options);
                } else {
                    result = await this.admin.messaging().sendAll([message])
                }
                if (result) {
                    const notifyResponse: IBaseResponse = {
                        success: true,
                        message: 'OK',
                        data: null};
                    return res.status(200).json(notifyResponse);
                } else {
                    return res.status(500).json({ success: false, message: 'Error sending notification'} as IBaseResponse);
                }
            } catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

    }
}

export const firebaseRoutes = new ApiFirebaseNotificationRoute();
