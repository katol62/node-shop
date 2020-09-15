import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {IUser, User} from '../models/User';
import * as bcrypt from 'bcrypt';
import config from '../misc/config';
import {IBaseResponse} from "../misc/db";
import {Secret} from "jsonwebtoken";

export class ApiAuthRoute {
    public router: express.Router = express.Router();
    private User = new User();

    constructor() {
        this.config();
    }
    private config(): void {
        this.router.get('/', (req: express.Request, res: express.Response) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!' });
        });

        this.router.post('/', async (req: express.Request, res: express.Response, next) => {
            if ((req.body.email && req.body.password) || (req.body.softcode && req.body.type && req.body.type === 'customer') ) {
                let email: string;
                let password: string;
                if (req.body.email && req.body.password) {
                    email = req.body.email;
                    password = req.body.password;
                } else {
                    email = req.body.softcode;
                    password = req.body.softcode;
                }
                try {
                    const users = await this.User.find({email});
                    if (!users.length) {
                        return res.status(404).json({ success: false, message: 'User not found' } as IBaseResponse);
                    }
                    const hash = users[0].password;
                    const doesMatch = await bcrypt.compare(password, hash);
                    if (doesMatch){
                        const user: IUser = users[0];
                        const payload = {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        };
                        const token = jwt.sign(payload, config.secret as Secret, {
                            expiresIn: config.tokenExpireIn
                        });
                        const data = {token, user};
                        res.status(200).json(
                            {
                                success: true,
                                message: 'Valid Token',
                                token,
                                data
                            } as IBaseResponse);
                    }else{
                        const errorResp: IBaseResponse = {
                            success: false,
                            message: 'Invalid Token',
                        };
                        return res.status(401).json({success: false, message: 'Invalid Token', data: null} as IBaseResponse);
                    }
                } catch (e) {
                    return res.status(500).json({ success: false, message: e.message, data: null} as IBaseResponse);
                }
            } else {
                return res.status(400).json({success: false, message: 'Missing parameters', data: null} as IBaseResponse);
            }
        });
    }
}

export const authRoutes = new ApiAuthRoute();
