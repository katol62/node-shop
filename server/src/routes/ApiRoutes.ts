import * as express from 'express';
import {authRoutes} from "./ApiAuthRoute";
import {checkJwt, hasRole} from "../middleware/MiddleWares";
import {usersRoutes} from "./ApiUserRoute";
import {regRoutes} from "./ApiRegisterRoute";
import {addressesRoutes} from "./ApiAddressesRoute";

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
        this.router.use('/addresses', checkJwt, addressesRoutes.router);
        this.router.use('/users', checkJwt, hasRole(['admin']), usersRoutes.router);
    }
}

export const apiRoutes = new ApiRoutes();
