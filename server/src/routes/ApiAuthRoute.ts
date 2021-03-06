import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import {IUser, User} from '../models/User';
import * as bcrypt from 'bcryptjs';
import config from '../misc/config';
import {IBaseResponse} from "../misc/db";
import {Secret} from "jsonwebtoken";
import {CODES} from "../misc/codes";
import {AuthHelper} from "../misc/AuthHelper";

export class ApiAuthRoute {
    public router: express.Router = express.Router();
    private User = new User();
    private auth = AuthHelper.instance;

    constructor() {
        this.config();
    }
    private config(): void {
        this.router.get('/', (req: express.Request, res: express.Response) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!', code: CODES.methodNotAllowed });
        });

        this.router.post('/', async (req: express.Request, res: express.Response) => {
            if ((req.body.phone && req.body.password) || (req.body.phone && req.body.verified) ) {
                const phone: string = req.body.phone;
                const password: string = req.body.password;
                try {
                    const users = await this.User.find({phone});
                    if (!users.length) {
                        return res.status(404).json({ success: false, message: 'User not found', code: CODES.notFound } as IBaseResponse);
                    }
                    let doesMatch = true;
                    if (password) {
                        const hash = users[0].password;
                        doesMatch = await bcrypt.compare(password, hash);
                    }
                    if (doesMatch){
                        const user: IUser = users[0];
                        const { token, refreshToken } = this.auth.generateToken(user);
                        const data = {token, refreshToken, user};
                        res.status(200).json(
                            {
                                success: true,
                                message: 'Valid Token',
                                data
                            } as IBaseResponse);
                    }else{
                        return res.status(404).json({success: false, message: 'Not found', code: CODES.notFound} as IBaseResponse);
                    }
                } catch (e) {
                    return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
                }
            } else {
                return res.status(400).json({success: false, message: 'Missing parameters', code: CODES.missingParameters} as IBaseResponse);
            }
        });

        this.router.post('/logout', async (req: express.Request, res: express.Response) => {
            if (req.body.refreshToken && req.body.phone) {
                const deleted = this.auth.deleteRefreshToken(req.body.refreshToken, req.body.phone);
                const status = deleted ? 200 : 204;
                res.status(status).json(
                    {
                        success: true,
                        message: 'Successfully logged out',
                    } as IBaseResponse);

            } else {
                return res.status(400).json({success: false, message: 'Missing parameters', code: CODES.missingParameters} as IBaseResponse);
            }
        })

        this.router.post('/refresh', async (req: express.Request, res: express.Response) => {
            if (req.body.refreshToken && req.body.phone) {
                const decoded: any = await jwt.decode(req.body.decoded);

                const validated = this.auth.verifyRefreshToken(req.body.refreshToken, req.body.phone);

                if (!validated) {
                    return res.status(401).json({success: false, message: 'Not Authorized'} as IBaseResponse);
                }

                const phone: string = req.body.phone;
                const users = await this.User.find({phone});
                if (!users.length) {
                    return res.status(404).json({ success: false, message: 'User not found', code: CODES.notFound } as IBaseResponse);
                }
                const user: IUser = users[0];
                const { token, refreshToken } = this.auth.generateToken(user);
                const data = {token};
                res.status(200).json(
                    {
                        success: true,
                        message: 'Valid Token',
                        data
                    } as IBaseResponse);
            } else {
                return res.status(401).json({success: false, message: 'Not Authorized'} as IBaseResponse);
            }
        })
    }
}

export const authRoutes = new ApiAuthRoute();
