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
exports.usersRoutes = void 0;
const express = require("express");
const User_1 = require("../models/User");
const bcrypt = require("bcrypt");
const MiddleWares_1 = require("../middleware/MiddleWares");
const Address_1 = require("../models/Address");
class ApiUserRoute {
    constructor() {
        this.router = express.Router();
        this.userModel = new User_1.User();
        this.addressesModel = new Address_1.Address();
        this.config();
    }
    config() {
        this.router.get('/', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body.decoded;
            const filter = {};
            try {
                const users = yield this.userModel.find(filter);
                return res.status(200).json({
                    success: true,
                    message: 'User list successfully received',
                    data: users
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.get('/:id', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body.decoded;
            console.log(user);
            const filter = { id: Number(req.params.id) };
            try {
                const result = yield this.userModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found' });
                }
                const rUser = result[0];
                return res.status(200).json({
                    success: true,
                    message: 'Admin successfully received',
                    data: rUser
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.post('/create', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let rUser = req.body.data;
            console.log(`user: $rUser`);
            try {
                const bcryptedPassword = yield bcrypt.hash(rUser.password, 5);
                console.log('bcryptedPassword: ' + bcryptedPassword);
                rUser.role = 'admin';
                rUser.password = bcryptedPassword;
                const result = yield this.userModel.create(rUser);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                rUser = Object.assign(Object.assign({}, rUser), { id: result.insertId });
                const updateResponse = {
                    success: true,
                    message: 'User created',
                    data: rUser
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/:id', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const rUser = req.body.data;
            try {
                if (rUser.password) {
                    const bcryptedPassword = yield bcrypt.hash(rUser.password, 5);
                    rUser.password = bcryptedPassword;
                }
                const result = yield this.userModel.update(rUser);
                if (result.affectedRows === 0) {
                    return res.status(204).json({ success: false, message: 'No Content' });
                }
                const updateResponse = {
                    success: true,
                    message: 'User updated',
                    data: rUser
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.delete('/:id', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            try {
                const resultAddress = yield this.addressesModel.deleteByUser(id);
                const result = yield this.userModel.delete(id);
                if (!result.affectedRows) {
                    return res.status(204).json({ success: false, message: 'No content' });
                }
                return res.status(200).json({ success: true, message: 'Admin deleted' });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
    }
}
exports.usersRoutes = new ApiUserRoute();
//# sourceMappingURL=ApiUserRoute.js.map