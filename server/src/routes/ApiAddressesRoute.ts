import * as express from "express";
import {Address, IAddress} from "../models/Address";
import {IUser} from "../models/User";
import connection, {IBaseResponse} from "../misc/db";
import {checkAuthorized} from "../middleware/MiddleWares";
import {CODES} from "../misc/codes";

class ApiAddressesRoute {
    public router: express.Router = express.Router();
    private addressModel: Address = new Address();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', checkAuthorized, async (req: express.Request, res: express.Response) => {
            const user: IUser = req.body.decoded;
            const all: boolean = req.body.data && req.body.data.all ? req.body.data.all : null;
            const filter: IAddress = all ? {} : {userId: user.id};
            try {
                const addresses = await this.addressModel.find(filter);
                return res.status(200).json({
                    success: true,
                    message: 'Addresses list successfully received',
                    data: addresses
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }
        });
        this.router.get('/:id', checkAuthorized,  async (req: express.Request, res: express.Response) => {
            const user: IUser = req.body.decoded;
            const filter: IAddress = {id: Number(req.params.id)};
            try {
                const result = await this.addressModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found', code: CODES.notFound} as IBaseResponse);
                }
                const rAddress = result[0];
                return res.status(200).json({
                    success: true,
                    message: 'Address successfully retrieved',
                    data: rAddress
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }
        });
        this.router.post('/create', async (req: express.Request, res: express.Response) => {
            let rAddress: IAddress = req.body.data;
            try {
                const result = await this.addressModel.create(rAddress);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content', code: CODES.noContent});
                }
                rAddress = {...rAddress, id: result.insertId};
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Address created',
                    code: CODES.created,
                    data: rAddress};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }
        });
        this.router.put('/:id', async (req: express.Request, res: express.Response) => {
            const rAddress: IAddress = req.body.data;
            try {
                const result = await this.addressModel.update(rAddress);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content', code: CODES.noContent} as IBaseResponse);
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Address updated',
                    code: CODES.updated,
                    data: rAddress};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }

        });
        this.router.delete('/:id', async (req: express.Request, res: express.Response) => {
            const id: number = Number(req.params.id);
            try {
                const result = await this.addressModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content', code: CODES.noContent} as IBaseResponse);
                }
                return res.status(200).json({ success: true, message: 'Address deleted', code: CODES.deleted} as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }

        });
    }
}

export const addressesRoutes = new ApiAddressesRoute();
