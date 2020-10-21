"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express = require("express");
const Product_1 = require("../models/Product");
const MiddleWares_1 = require("../middleware/MiddleWares");
class ApiProductRoute {
    constructor() {
        this.router = express.Router();
        this.productModel = new Product_1.Product();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = req.query.category ? { category: req.query.category.toString().split(',') } : {};
                const products = yield this.productModel.find(filter);
                let resultProducts = [];
                products.forEach(product => {
                    const img1 = product.image1 ? product.image1.toString('utf-8') : null;
                    const img2 = product.image2 ? product.image2.toString('utf-8') : null;
                    const img3 = product.image3 ? product.image3.toString('utf-8') : null;
                    const img4 = product.image4 ? product.image4.toString('utf-8') : null;
                    const upd = Object.assign(Object.assign({}, product), { image1: img1, image2: img2, image3: img3, image4: img4 });
                    resultProducts.push(upd);
                });
                return res.status(200).json({
                    success: true,
                    message: 'Products list successfully received',
                    data: resultProducts
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = Number(req.params.id);
                const filter = { id: productId };
                const result = yield this.productModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found' });
                }
                const categories = yield this.productModel.getCategories(productId);
                let resultCategories = [];
                categories.forEach(cat => {
                    resultCategories.push(cat.category);
                });
                const rProduct = result[0];
                const img1 = rProduct.image1 ? rProduct.image1.toString('utf-8') : null;
                const img2 = rProduct.image2 ? rProduct.image2.toString('utf-8') : null;
                const img3 = rProduct.image3 ? rProduct.image3.toString('utf-8') : null;
                const img4 = rProduct.image4 ? rProduct.image4.toString('utf-8') : null;
                const updProduct = Object.assign(Object.assign({}, rProduct), { image1: img1, image2: img2, image3: img3, image4: img4, category: resultCategories });
                return res.status(200).json({
                    success: true,
                    message: 'Product successfully retrieved',
                    data: updProduct
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.post('/', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['super', 'admin']), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let rProduct = req.body.data;
                const result = yield this.productModel.create(rProduct);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                rProduct = Object.assign(Object.assign({}, rProduct), { id: result.insertId });
                for (let i = 0; i < rProduct.category.length; i++) {
                    yield this.productModel.reference(rProduct.id, Number(rProduct.category[i]));
                }
                const updateResponse = {
                    success: true,
                    message: 'Product created',
                    data: rProduct
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/:id', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['super', 'admin']), (req, res) => __awaiter(this, void 0, void 0, function* () {
            let rProduct = req.body.data;
            try {
                const result = yield this.productModel.update(rProduct);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                yield this.productModel.clearReference(rProduct.id);
                for (let i = 0; i < rProduct.category.length; i++) {
                    yield this.productModel.reference(rProduct.id, Number(rProduct.category[i]));
                }
                const updateResponse = {
                    success: true,
                    message: 'Product updated',
                    data: rProduct
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.delete('/:id', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['super', 'admin']), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                yield this.productModel.clearReference(id);
                const result = yield this.productModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content' });
                }
                return res.status(200).json({ success: true, message: 'Product deleted' });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
    }
}
exports.productRoutes = new ApiProductRoute();
//# sourceMappingURL=ApiProductRoute.js.map