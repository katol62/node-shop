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
exports.meRoutes = void 0;
const express = require("express");
const User_1 = require("../models/User");
const MiddleWares_1 = require("../middleware/MiddleWares");
const bcrypt = require("bcrypt");
class ApiMeRoute {
    constructor() {
        this.router = express.Router();
        this.userModel = new User_1.User();
        this.config();
    }
    config() {
        this.router.post('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.delete('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.get('/', MiddleWares_1.checkAuthorized, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = req.body.decoded;
            console.log(user);
            const filter = { id: Number(user.id) };
            try {
                const result = yield this.userModel.find(filter);
                if (!result.length) {
                    return res.status(404).json({ success: false, message: 'Not found' });
                }
                const rUser = result[0];
                return res.status(200).json({
                    success: true,
                    message: 'Me successfully received',
                    data: rUser
                });
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
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
                    message: 'Me updated',
                    data: rUser
                };
                return res.status(200).json(updateResponse);
            }
            catch (e) {
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
    }
}
exports.meRoutes = new ApiMeRoute();
//# sourceMappingURL=ApiMeRoute.js.map