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
exports.bannerRoutes = void 0;
const express = require("express");
const Banner_1 = require("../models/Banner");
const MiddleWares_1 = require("../middleware/MiddleWares");
class ApiBannerRoute {
    constructor() {
        this.router = express.Router();
        this.bannerModel = new Banner_1.Banner();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const all = req.query && req.query.all ? (req.query.all === 'true') : null;
            const filter = all ? {} : { display: true };
            try {
                const banners = yield this.bannerModel.find(filter);
                banners.forEach(banner => {
                    const parsedImage = banner.image.toString('utf-8');
                    banner.image = parsedImage;
                    banner.src = banner.image.toString('utf-8');
                });
                return res.status(200).json({
                    success: true,
                    message: 'Banners list successfully received',
                    data: banners
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.get('/:id', MiddleWares_1.checkJwt, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const filter = { id: Number(req.params.id) };
            try {
                const result = yield this.bannerModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found' });
                }
                const rBanner = result[0];
                const parsedImage = rBanner.image.toString('utf-8');
                rBanner.image = parsedImage;
                return res.status(200).json({
                    success: true,
                    message: 'Banner successfully retrieved',
                    data: rBanner
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.post('/', MiddleWares_1.checkJwt, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let banner = { name: req.body.data.name, image: req.body.data.image, description: req.body.data.description, display: req.body.data.display === 'true' ? true : false };
                const result = yield this.bannerModel.create(banner);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                banner = Object.assign(Object.assign({}, banner), { id: result.insertId });
                const updateResponse = {
                    success: true,
                    message: 'Banner created',
                    data: banner
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/:id', MiddleWares_1.checkJwt, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let rBanner = { id: Number(req.params.id), name: req.body.data.name, image: req.body.data.image ? req.body.data.image : null, description: req.body.data.description, display: req.body.data.display === 'true' };
                const result = yield this.bannerModel.update(rBanner);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                const updateResponse = {
                    success: true,
                    message: 'Banner updated',
                    data: rBanner
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.delete('/:id', MiddleWares_1.checkJwt, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const result = yield this.bannerModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content' });
                }
                return res.status(200).json({ success: true, message: 'Banner deleted' });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
    }
}
exports.bannerRoutes = new ApiBannerRoute();
//# sourceMappingURL=ApiBannerRoute.js.map