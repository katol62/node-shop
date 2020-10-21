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
exports.regRoutes = exports.ApiRegisterRoute = void 0;
const express = require("express");
const User_1 = require("../models/User");
const bcrypt = require("bcrypt");
class ApiRegisterRoute {
    constructor() {
        this.router = express.Router();
        this.User = new User_1.User();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!' });
        });
        this.router.put('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!' });
        });
        this.router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if ((req.body.phone && req.body.password) || (req.body.phone && req.body.verified)) {
                const phone = req.body.phone;
                const password = req.body.password ? req.body.password : null;
                const firstName = req.body.firstName ? req.body.firstName : '';
                const lastName = req.body.lastName ? req.body.lastName : '';
                const email = req.body.email ? req.body.email : '';
                try {
                    const users = yield this.User.find({ phone: phone });
                    if (users.length) {
                        return res.status(409).json({ success: false, message: 'Account already exists' });
                    }
                    let rUser = { phone: phone, role: 'user', firstName: firstName, lastName: lastName, email: email };
                    if (password) {
                        const bcryptedPassword = yield bcrypt.hash(password, 5);
                        rUser.password = bcryptedPassword;
                        rUser.verified = false;
                        console.log('bcryptedPassword: ' + bcryptedPassword);
                    }
                    else {
                        rUser.password = null;
                        rUser.verified = true;
                    }
                    const result = yield this.User.create(rUser);
                    if (!result.insertId) {
                        return res.status(204).json({ success: false, message: 'No Content' });
                    }
                    rUser.id = result.insertId;
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
            }
            else {
                return res.status(422).json({ success: false, message: 'Missing parameters', data: null });
            }
        }));
    }
}
exports.ApiRegisterRoute = ApiRegisterRoute;
exports.regRoutes = new ApiRegisterRoute();
//# sourceMappingURL=ApiRegisterRoute.js.map