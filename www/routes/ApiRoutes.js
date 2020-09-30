"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express = require("express");
const ApiAuthRoute_1 = require("./ApiAuthRoute");
const MiddleWares_1 = require("../middleware/MiddleWares");
const ApiUserRoute_1 = require("./ApiUserRoute");
class ApiRoutes {
    constructor() {
        this.router = express.Router();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed!' });
        });
        this.router.put('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.post('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.use('/auth', ApiAuthRoute_1.authRoutes.router);
        this.router.use('/users', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['admin']), ApiUserRoute_1.usersRoutes.router);
    }
}
exports.apiRoutes = new ApiRoutes();
//# sourceMappingURL=ApiRoutes.js.map