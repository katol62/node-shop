import * as express from 'express';
import {IUser, User} from "../models/User";
import {IBaseResponse} from "../misc/db";
import * as bcrypt from 'bcryptjs';
import {checkAuthorized} from "../middleware/MiddleWares";
import {Address} from "../models/Address";

class ApiUserRoute {
    public router: express.Router = express.Router();
    private userModel: User = new User();
    private addressesModel: Address = new Address();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', checkAuthorized, async (req: express.Request, res: express.Response) => {
            const user: IUser = req.body.decoded;
            const filter: IUser = {};
            try {
                const users = await this.userModel.find(filter);
                return res.status(200).json({
                    success: true,
                    message: 'User list successfully received',
                    data: users
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

        this.router.get('/:id', checkAuthorized,  async (req: express.Request, res: express.Response) => {
            const user: IUser = req.body.decoded;
            console.log(user);
            const filter: IUser = {id: Number(req.params.id)};
            try {
                const result = await this.userModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found'} as IBaseResponse);
                }
                const rUser = result[0];
                return res.status(200).json({
                    success: true,
                    message: 'Admin successfully received',
                    data: rUser
                } as IBaseResponse);

            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.post('/create', checkAuthorized, async (req: express.Request, res: express.Response) => {
            let rUser: IUser = req.body.data;
            console.log(`user: $rUser`)
            try {
                const bcryptedPassword = await bcrypt.hash(rUser.password, 5);
                console.log('bcryptedPassword: ' + bcryptedPassword);
                rUser.role = 'admin';
                rUser.password = bcryptedPassword;
                const result = await this.userModel.create(rUser);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content'});
                }
                rUser = {...rUser, id: result.insertId};
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'User created',
                    data: rUser};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.put('/:id', checkAuthorized, async (req: express.Request, res: express.Response) => {
            const rUser: IUser = req.body.data;
            try {
                if (rUser.password) {
                    const bcryptedPassword = await bcrypt.hash(rUser.password, 5);
                    rUser.password = bcryptedPassword;
                }
                const result = await this.userModel.update(rUser);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content'} as IBaseResponse);
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'User updated',
                    data: rUser};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.delete('/:id', checkAuthorized, async (req: express.Request, res: express.Response) => {
            const id: number = Number(req.params.id);
            try {
                const resultAddress = await this.addressesModel.deleteByUser(id);
                const result = await this.userModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content'} as IBaseResponse);
                }
                return res.status(200).json({ success: true, message: 'Admin deleted'} as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
    }
}

export const usersRoutes = new ApiUserRoute();

