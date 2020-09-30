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
exports.authRoutes = exports.ApiAuthRoute = void 0;
const express = require("express");
const jwt = require("jsonwebtoken");
const User_1 = require("../models/User");
const bcrypt = require("bcrypt");
const config_1 = require("../misc/config");
class ApiAuthRoute {
    constructor() {
        this.router = express.Router();
        this.User = new User_1.User();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Method not allowed!!!' });
        });
        this.router.post('/', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if ((req.body.email && req.body.password) || (req.body.softcode && req.body.type && req.body.type === 'customer')) {
                let email;
                let password;
                if (req.body.email && req.body.password) {
                    email = req.body.email;
                    password = req.body.password;
                }
                else {
                    email = req.body.softcode;
                    password = req.body.softcode;
                }
                try {
                    const users = yield this.User.find({ email });
                    if (!users.length) {
                        return res.status(404).json({ success: false, message: 'User not found' });
                    }
                    const hash = users[0].password;
                    const doesMatch = yield bcrypt.compare(password, hash);
                    if (doesMatch) {
                        const user = users[0];
                        const payload = {
                            id: user.id,
                            email: user.email,
                            role: user.role
                        };
                        const token = jwt.sign(payload, config_1.default.secret, {
                            expiresIn: config_1.default.tokenExpireIn
                        });
                        const data = { token, user };
                        res.status(200).json({
                            success: true,
                            message: 'Valid Token',
                            token,
                            data
                        });
                    }
                    else {
                        const errorResp = {
                            success: false,
                            message: 'Invalid Token',
                        };
                        return res.status(401).json({ success: false, message: 'Invalid Token', data: null });
                    }
                }
                catch (e) {
                    return res.status(500).json({ success: false, message: e.message, data: null });
                }
            }
            else {
                return res.status(400).json({ success: false, message: 'Missing parameters', data: null });
            }
        }));
    }
}
exports.ApiAuthRoute = ApiAuthRoute;
exports.authRoutes = new ApiAuthRoute();
//# sourceMappingURL=ApiAuthRoute.js.map