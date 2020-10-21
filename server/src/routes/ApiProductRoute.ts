import * as express from "express";
import {IProductExt, Product} from "../models/Product";
import {IBaseResponse} from "../misc/db";
import {checkJwt, hasRole} from "../middleware/MiddleWares";

class ApiProductRoute {
    public router: express.Router = express.Router();
    private productModel: Product = new Product();

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', async (req: express.Request, res: express.Response) => {
            try {
                const filter: IProductExt = req.query.category ? {category: req.query.category.toString().split(',')} : {};
                const products = await this.productModel.find(filter);
                let resultProducts = [];
                products.forEach( product => {
                    const img1 = product.image1 ? product.image1.toString('utf-8') : null;
                    const img2 = product.image2 ? product.image2.toString('utf-8') : null;
                    const img3 = product.image3 ? product.image3.toString('utf-8') : null;
                    const img4 = product.image4 ? product.image4.toString('utf-8') : null;
                    const upd = {...product, image1: img1, image2: img2, image3: img3, image4: img4};
                    resultProducts.push(upd);
                })
                return res.status(200).json({
                    success: true,
                    message: 'Products list successfully received',
                    data: resultProducts
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

        this.router.get('/:id', async (req: express.Request, res: express.Response) => {
            try {
                const productId = Number(req.params.id);
                const filter: IProductExt = {id: productId};
                const result = await this.productModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found'} as IBaseResponse);
                }
                const categories = await this.productModel.getCategories(productId);
                let resultCategories = [];
                categories.forEach(cat => {
                    resultCategories.push(cat.category);
                })
                const rProduct = result[0];
                const img1 = rProduct.image1 ? rProduct.image1.toString('utf-8') : null;
                const img2 = rProduct.image2 ? rProduct.image2.toString('utf-8') : null;
                const img3 = rProduct.image3 ? rProduct.image3.toString('utf-8') : null;
                const img4 = rProduct.image4 ? rProduct.image4.toString('utf-8') : null;
                const updProduct = {...rProduct, image1: img1, image2: img2, image3: img3, image4: img4, category: resultCategories};
                return res.status(200).json({
                    success: true,
                    message: 'Product successfully retrieved',
                    data: updProduct
                } as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

        this.router.post('/', checkJwt, hasRole(['super', 'admin']), async (req: express.Request, res: express.Response) => {
            try {
                let rProduct: IProductExt  = req.body.data;
                const result = await this.productModel.create(rProduct);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content'});
                }
                rProduct = {...rProduct, id: result.insertId};
                for (let i = 0; i < rProduct.category.length; i++) {
                    await this.productModel.reference(rProduct.id, Number(rProduct.category[i]));
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Product created',
                    data: rProduct};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

        this.router.put('/:id', checkJwt, hasRole(['super', 'admin']), async (req: express.Request, res: express.Response) => {
            let rProduct: IProductExt  = req.body.data;
            try {
                const result = await this.productModel.update(rProduct);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content'} as IBaseResponse);
                }
                await this.productModel.clearReference(rProduct.id)
                for (let i = 0; i < rProduct.category.length; i++) {
                    await this.productModel.reference(rProduct.id, Number(rProduct.category[i]));
                }
                const updateResponse: IBaseResponse = {
                    success: true,
                    message: 'Product updated',
                    data: rProduct};
                return res.status(200).json(updateResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

        this.router.delete('/:id', checkJwt, hasRole(['super', 'admin']), async (req: express.Request, res: express.Response) => {
            const id: number = Number(req.params.id);
            try {
                await this.productModel.clearReference(id);
                const result = await this.productModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content'} as IBaseResponse);
                }
                return res.status(200).json({ success: true, message: 'Product deleted'} as IBaseResponse);
            } catch (e) {
                return res.status(500).json({ success: false, message: e.message} as IBaseResponse);
            }
        });

    }
}

export const productRoutes = new ApiProductRoute()
