import * as express from "express";
import {Banner, IBanner} from "../models/Banner";
import {IBaseResponse} from "../misc/db";
import {checkJwt} from "../middleware/MiddleWares";
import {CODES} from "../misc/codes";

class ApiBannerRoute {
    public router: express.Router = express.Router();
    private bannerModel: Banner = new Banner();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            const all: boolean = req.query && req.query.all ? (req.query.all === 'true') : null;
            const filter: IBanner = all ? {} : {display: true};
            try {
                const banners = await this.bannerModel.find(filter);
                banners.forEach(banner => {
                    const parsedImage = banner.image.toString('utf-8');
                    banner.image = parsedImage;
                    banner.src = banner.image.toString('utf-8');
                })
                return res.status(200).json({
                    success: true,
                    message: 'Banners list successfully received',
                    data: banners
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message, code: CODES.serverError} as IBaseResponse);
            }
        });
        this.router.get('/:id', checkJwt,  async (req: express.Request, res: express.Response) => {
            const filter: IBanner = {id: Number(req.params.id)};
            try {
                const result = await this.bannerModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found', code: CODES.notFound} as IBaseResponse);
                }
                const rBanner = result[0];
                const parsedImage = rBanner.image.toString('utf-8');
                rBanner.image = parsedImage;
                return res.status(200).json({
                    success: true,
                    message: 'Banner successfully retrieved',
                    data: rBanner
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.post('/', checkJwt, async (req: express.Request, res: express.Response) => {
            try {
                let banner: IBanner = {name: req.body.data.name, image: req.body.data.image, description: req.body.data.description, display: req.body.data.display}
                const result = await this.bannerModel.create(banner);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content', code: CODES.noContent});
                }
                banner = {...banner, id: result.insertId};
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Banner created',
                    code: CODES.created,
                    data: banner};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.put('/:id', checkJwt, async (req: express.Request, res: express.Response) => {
            try {
                let rBanner: IBanner = {id: Number(req.params.id), name: req.body.data.name, image: req.body.data.image ? req.body.data.image : null, description: req.body.data.description, display: req.body.data.display}
                const result = await this.bannerModel.update(rBanner);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content', code: CODES.noContent} as IBaseResponse);
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Banner updated',
                    code: CODES.updated,
                    data: rBanner};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }

        });
        this.router.delete('/:id', checkJwt, async (req: express.Request, res: express.Response) => {
            const id: number = Number(req.params.id);
            try {
                const result = await this.bannerModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content', code: CODES.noContent} as IBaseResponse);
                }
                return res.status(200).json({ success: true, message: 'Banner deleted', code: CODES.deleted} as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
    }
}

export const bannerRoutes = new ApiBannerRoute();
