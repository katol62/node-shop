import * as express from "express";
import {IUser, User} from "../models/User";
import {NextFunction} from "express";
import {IBaseResponse} from "../misc/db";
import * as bcrypt from "bcryptjs";

export class ApiRegisterRoute {
    public router: express.Router = express.Router();
    private User = new User();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', (req: express.Request, res: express.Response) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!' });
        });
        this.router.put('/', (req: express.Request, res: express.Response) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!' });
        });
        this.router.post('/', async (req: express.Request, res: express.Response, next: NextFunction) => {
            if ((req.body.phone && req.body.password) || (req.body.phone && req.body.verified) ) {
                const phone: string = req.body.phone;
                const password: string = req.body.password ? req.body.password : null;
                const firstName: string = req.body.firstName ? req.body.firstName : '';
                const lastName: string = req.body.lastName ? req.body.lastName : '';
                const email: string = req.body.email ? req.body.email : '';
                try {
                    const users = await this.User.find({phone: phone});
                    if (users.length) {
                        return res.status(409).json({ success: false, message: 'Account already exists'});
                    }
                    let rUser: IUser = {phone: phone, role: 'user', firstName: firstName, lastName: lastName, email: email};
                    if (password) {
                        const bcryptedPassword = await bcrypt.hash(password, 5);
                        rUser.password = bcryptedPassword;
                        rUser.verified = false;
                        console.log('bcryptedPassword: ' + bcryptedPassword);
                    } else {
                        rUser.password = null;
                        rUser.verified = true;
                    }
                    const result = await this.User.create(rUser);
                    if (!result.insertId) {
                        return res.status(204).json({ success: false, message: 'No Content'});
                    }
                    rUser.id = result.insertId;
                    const updateResponse: IBaseResponse = {
                        success: true,
                        message: 'User created',
                        data: rUser};
                    return res.status(200).json(updateResponse);
                } catch (e) {
                    return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
                }
            } else {
                return res.status(422).json({success: false, message: 'Missing parameters', data: null} as IBaseResponse);
            }
        })
    }
}

export const regRoutes = new ApiRegisterRoute();
