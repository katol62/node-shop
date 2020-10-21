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
exports.categoryRoutes = void 0;
const express = require("express");
const Category_1 = require("../models/Category");
const MiddleWares_1 = require("../middleware/MiddleWares");
class ApiCategoryRoute {
    constructor() {
        this.router = express.Router();
        this.categoryModel = new Category_1.Category();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const all = req.query && req.query.all ? (req.query.all === 'true') : null;
            const filter = all ? {} : { display: true };
            try {
                const categories = yield this.categoryModel.find(filter);
                categories.forEach(category => {
                    const parsedImage = category.image.toString('utf-8');
                    category.image = parsedImage;
                    category.src = category.image.toString('utf-8');
                });
                return res.status(200).json({
                    success: true,
                    message: 'Categories list successfully received',
                    data: categories
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.get('/:id', MiddleWares_1.checkJwt, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const filter = { id: Number(req.params.id) };
            try {
                const result = yield this.categoryModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found' });
                }
                const rCategory = result[0];
                const parsedImage = rCategory.image.toString('utf-8');
                rCategory.image = parsedImage;
                return res.status(200).json({
                    success: true,
                    message: 'Category successfully retrieved',
                    data: rCategory
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.post('/', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['super', 'admin']), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let category = { name: req.body.data.name, image: req.body.data.image, description: req.body.data.description, display: req.body.data.display };
                const result = yield this.categoryModel.create(category);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                category = Object.assign(Object.assign({}, category), { id: result.insertId });
                const updateResponse = {
                    success: true,
                    message: 'Category created',
                    data: category
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/:id', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['super', 'admin']), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let rCategory = { id: Number(req.params.id), name: req.body.data.name, image: req.body.data.image ? req.body.data.image : null, description: req.body.data.description, display: req.body.data.display };
                const result = yield this.categoryModel.update(rCategory);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                const updateResponse = {
                    success: true,
                    message: 'Category updated',
                    data: rCategory
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
                const result = yield this.categoryModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content' });
                }
                return res.status(200).json({ success: true, message: 'Category deleted' });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
    }
}
exports.categoryRoutes = new ApiCategoryRoute();
//# sourceMappingURL=ApiCategoryRoute.js.map