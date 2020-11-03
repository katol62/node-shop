import * as express from "express";
import {IUser, User} from "../models/User";
import {checkAuthorized} from "../middleware/MiddleWares";
import {IBaseResponse} from "../misc/db";
import * as bcrypt from "bcryptjs";
import {CODES} from "../misc/codes";

class ApiMeRoute {
    public router: express.Router = express.Router();
    private userModel: User = new User();

    constructor() {
        this.config();
    }

    private config() {
        this.router.post('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed});
            }
        );

        this.router.delete('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed});
            }
        );

        this.router.get('/', checkAuthorized,  async (req: express.Request, res: express.Response) => {
            const user: IUser = req.body.decoded;
            console.log(user);
            const filter: IUser = {id: Number(user.id)};
            try {
                const result = await this.userModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found', code: CODES.notFound} as IBaseResponse);
                }
                const rUser = result[0];
                return res.status(200).json({
                    success: true,
                    message: 'Me successfully received',
                    data: rUser
                } as IBaseResponse);

            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }
        });

        this.router.put('/',async (req: express.Request, res: express.Response) => {
            const rUser: IUser = req.body.data;
            try {
                if (rUser.password) {
                    const bcryptedPassword = await bcrypt.hash(rUser.password, 5);
                    rUser.password = bcryptedPassword;
                }
                const result = await this.userModel.update(rUser);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content', code: CODES.noContent} as IBaseResponse);
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Me updated',
                    code: CODES.updated,
                    data: rUser};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }
        });


    }
}

export const meRoutes = new ApiMeRoute();
