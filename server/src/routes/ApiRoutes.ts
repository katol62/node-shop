import * as express from 'express';
import {authRoutes} from "./ApiAuthRoute";
import {checkJwt, hasRole} from "../middleware/MiddleWares";
import {usersRoutes} from "./ApiUserRoute";
import {regRoutes} from "./ApiRegisterRoute";
import {addressesRoutes} from "./ApiAddressesRoute";
import {verifyRoutes} from "./ApiVerifyRoute";
import {meRoutes} from "./ApiMeRoute";
import {bannerRoutes} from "./ApiBannerRoute";
import {categoryRoutes} from "./ApiCategoryRoute";
import {instaRoutes} from "./ApiInstaRoute";
import {productRoutes} from "./ApiProductRoute";
import {firebaseRoutes} from "./ApiFirebaseNotificationRoute";

class ApiRoutes {

    public router: express.Router = express.Router();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed!' });
            }
        );
        this.router.put('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed'});
            }
        );
        this.router.post('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed' });
            }
        );
        this.router.use('/auth', authRoutes.router);
        this.router.use('/register', regRoutes.router);
        this.router.use('/verify', verifyRoutes.router);
        this.router.use('/insta', instaRoutes.router);
        this.router.use('/me', checkJwt, meRoutes.router);
        this.router.use('/banners', bannerRoutes.router);
        this.router.use('/categories', categoryRoutes.router);
        this.router.use('/products', productRoutes.router);
        this.router.use('/notify', checkJwt, hasRole(['super', 'admin']), firebaseRoutes.router);
        this.router.use('/addresses', checkJwt, addressesRoutes.router);
        this.router.use('/users', checkJwt, hasRole(['super', 'admin']), usersRoutes.router);
    }
}

export const apiRoutes = new ApiRoutes();
