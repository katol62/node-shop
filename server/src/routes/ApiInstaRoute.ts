import * as express from 'express';
import {InstaBasicDisplay} from "../misc/InstaBasicDisplay";
import {IBaseResponse} from "../misc/db";
import {CODES} from "../misc/codes";

export const InstaConfig = {
    appId: '624517498225281',
    redirectUri: 'https://poker.nlop.com/',
    appSecret: 'a32d76ae0120dea9ed74909315dc9137'
}

export const InstaCode = 'AQBBot90e7Dibo2IYYpOlAtV7oxnl46biHLb7RaPb9l3lLBPIlP64x2zJuoozwv9KODFi-vKrYEPiARp-52YfGZyFhjUgafbf8V3Dv5QGwPcPZx-x-scSvubSM4dWsq3Brbazl1J2ODTWmyN7VtpVzkx479Inc0qOq9uGh-zOxxRdoFi_97A_O1f97Gf5uZJBNSA4tct-cXag85daGXMA5yUNIzEzAIRv7CdvxpSpxI2pQ';

const iUserName: string = 'konstantintolochko';
const iUserPassword: string = 'RjycnfynbyNjkjxrj1962';

const iUserNameTvN: string = 'tutvam_netam';
const iUserPasswordTvN: string = 'tutvamnetam2019K';

class ApiInstaRoute {
    public router: express.Router = express.Router();
    private instaBasicDisplay: InstaBasicDisplay = new InstaBasicDisplay()

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            try {
                const token = this.instaBasicDisplay.accessToken;
                const data = await this.instaBasicDisplay.retrieveUserMedia(token);
                const instaResponse: IBaseResponse = {
                    success: true,
                    message: 'OK',
                    data: data};
                return res.status(200).json(instaResponse);
                console.log('get');
            } catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.get('/:id', async (req: express.Request, res: express.Response) => {
            try {
                const token = this.instaBasicDisplay.accessToken;
                const data = await this.instaBasicDisplay.retrieveMediaData(token, req.params.id);
                const instaResponse: IBaseResponse = {
                    success: true,
                    message: 'OK',
                    data: data};
                return res.status(200).json(instaResponse);
            } catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.put('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Method not allowed', code: CODES.methodNotAllowed});
            }
        );
        this.router.post('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed });
            }
        );
        this.router.delete('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed });
            }
        );
    }

}

export const instaRoutes = new ApiInstaRoute();
