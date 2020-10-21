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
exports.addressesRoutes = void 0;
const express = require("express");
const Address_1 = require("../models/Address");
const MiddleWares_1 = require("../middleware/MiddleWares");
class ApiAddressesRoute {
    constructor() {
        this.router = express.Router();
        this.addressModel = new Address_1.Address();
        this.config();
    }
    config() {
        this.router.get('/', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body.decoded;
            const all = req.body.data && req.body.data.all ? req.body.data.all : null;
            const filter = all ? {} : { userId: user.id };
            try {
                const addresses = yield this.addressModel.find(filter);
                return res.status(200).json({
                    success: true,
                    message: 'Addresses list successfully received',
                    data: addresses
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.get('/:id', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body.decoded;
            const filter = { id: Number(req.params.id) };
            try {
                const result = yield this.addressModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found' });
                }
                const rAddress = result[0];
                return res.status(200).json({
                    success: true,
                    message: 'Address successfully retrieved',
                    data: rAddress
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.post('/create', (req, res) => __awaiter(this, void 0, void 0, function* () {
            let rAddress = req.body.data;
            try {
                const result = yield this.addressModel.create(rAddress);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                rAddress = Object.assign(Object.assign({}, rAddress), { id: result.insertId });
                const updateResponse = {
                    success: true,
                    message: 'Address created',
                    data: rAddress
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const rAddress = req.body.data;
            try {
                const result = yield this.addressModel.update(rAddress);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                const updateResponse = {
                    success: true,
                    message: 'Address updated',
                    data: rAddress
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const result = yield this.addressModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content' });
                }
                return res.status(200).json({ success: true, message: 'Address deleted' });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
    }
}
exports.addressesRoutes = new ApiAddressesRoute();
//# sourceMappingURL=ApiAddressesRoute.js.map