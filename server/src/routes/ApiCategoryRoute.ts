import * as express from "express";
import {Category, ICategory} from "../models/Category";
import {IBaseResponse} from "../misc/db";
import {checkJwt, hasRole} from "../middleware/MiddleWares";

class ApiCategoryRoute {
    public router: express.Router = express.Router();
    private categoryModel: Category = new Category();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            const all: boolean = req.query && req.query.all ? (req.query.all === 'true') : null;
            const filter: ICategory = all ? {} : {display: true};
            try {
                const categories = await this.categoryModel.find(filter);
                categories.forEach(category => {
                    const parsedImage = category.image.toString('utf-8');
                    category.image = parsedImage;
                    category.src = category.image.toString('utf-8');
                })
                return res.status(200).json({
                    success: true,
                    message: 'Categories list successfully received',
                    data: categories
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.get('/:id', checkJwt,  async (req: express.Request, res: express.Response) => {
            const filter: ICategory = {id: Number(req.params.id)};
            try {
                const result = await this.categoryModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found'} as IBaseResponse);
                }
                const rCategory = result[0];
                const parsedImage = rCategory.image.toString('utf-8');
                rCategory.image = parsedImage;
                return res.status(200).json({
                    success: true,
                    message: 'Category successfully retrieved',
                    data: rCategory
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.post('/', checkJwt, hasRole(['super', 'admin']), async (req: express.Request, res: express.Response) => {
            try {
                let category: ICategory = {name: req.body.data.name, image: req.body.data.image, description: req.body.data.description, display: req.body.data.display}
                const result = await this.categoryModel.create(category);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content'});
                }
                category = {...category, id: result.insertId};
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Category created',
                    data: category};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.put('/:id', checkJwt, hasRole(['super', 'admin']), async (req: express.Request, res: express.Response) => {
            try {
                let rCategory: ICategory = {id: Number(req.params.id), name: req.body.data.name, image: req.body.data.image ? req.body.data.image : null, description: req.body.data.description, display: req.body.data.display}
                const result = await this.categoryModel.update(rCategory);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content'} as IBaseResponse);
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Category updated',
                    data: rCategory};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });
        this.router.delete('/:id', checkJwt, hasRole(['super', 'admin']), async (req: express.Request, res: express.Response) => {
            const id: number = Number(req.params.id);
            try {
                const result = await this.categoryModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content'} as IBaseResponse);
                }
                return res.status(200).json({ success: true, message: 'Category deleted'} as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

    }
}

export const categoryRoutes = new ApiCategoryRoute();
