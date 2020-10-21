"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRoutes = void 0;
const express = require("express");
const ApiAuthRoute_1 = require("./ApiAuthRoute");
const MiddleWares_1 = require("../middleware/MiddleWares");
const ApiUserRoute_1 = require("./ApiUserRoute");
const ApiRegisterRoute_1 = require("./ApiRegisterRoute");
const ApiAddressesRoute_1 = require("./ApiAddressesRoute");
const ApiVerifyRoute_1 = require("./ApiVerifyRoute");
const ApiMeRoute_1 = require("./ApiMeRoute");
const ApiBannerRoute_1 = require("./ApiBannerRoute");
const ApiCategoryRoute_1 = require("./ApiCategoryRoute");
const ApiInstaRoute_1 = require("./ApiInstaRoute");
const ApiProductRoute_1 = require("./ApiProductRoute");
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
        this.router.use('/register', ApiRegisterRoute_1.regRoutes.router);
        this.router.use('/verify', ApiVerifyRoute_1.verifyRoutes.router);
        this.router.use('/insta', ApiInstaRoute_1.instaRoutes.router);
        this.router.use('/me', MiddleWares_1.checkJwt, ApiMeRoute_1.meRoutes.router);
        this.router.use('/banners', ApiBannerRoute_1.bannerRoutes.router);
        this.router.use('/categories', ApiCategoryRoute_1.categoryRoutes.router);
        this.router.use('/products', ApiProductRoute_1.productRoutes.router);
        this.router.use('/addresses', MiddleWares_1.checkJwt, ApiAddressesRoute_1.addressesRoutes.router);
        this.router.use('/users', MiddleWares_1.checkJwt, MiddleWares_1.hasRole(['super', 'admin']), ApiUserRoute_1.usersRoutes.router);
    }
}
exports.apiRoutes = new ApiRoutes();
//# sourceMappingURL=ApiRoutes.js.map