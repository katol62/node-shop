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
exports.instaRoutes = exports.InstaCode = exports.InstaConfig = void 0;
const express = require("express");
const InstaBasicDisplay_1 = require("../misc/InstaBasicDisplay");
exports.InstaConfig = {
    appId: '624517498225281',
    redirectUri: 'https://poker.nlop.com/',
    appSecret: 'a32d76ae0120dea9ed74909315dc9137'
};
exports.InstaCode = 'AQBBot90e7Dibo2IYYpOlAtV7oxnl46biHLb7RaPb9l3lLBPIlP64x2zJuoozwv9KODFi-vKrYEPiARp-52YfGZyFhjUgafbf8V3Dv5QGwPcPZx-x-scSvubSM4dWsq3Brbazl1J2ODTWmyN7VtpVzkx479Inc0qOq9uGh-zOxxRdoFi_97A_O1f97Gf5uZJBNSA4tct-cXag85daGXMA5yUNIzEzAIRv7CdvxpSpxI2pQ';
const iUserName = 'konstantintolochko';
const iUserPassword = 'RjycnfynbyNjkjxrj1962';
const iUserNameTvN = 'tutvam_netam';
const iUserPasswordTvN = 'tutvamnetam2019K';
class ApiInstaRoute {
    constructor() {
        this.router = express.Router();
        this.instaBasicDisplay = new InstaBasicDisplay_1.InstaBasicDisplay();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = this.instaBasicDisplay.accessToken;
                const data = yield this.instaBasicDisplay.retrieveUserMedia(token);
                const instaResponse = {
                    success: true,
                    message: 'OK',
                    data: data
                };
                return res.status(200).json(instaResponse);
                console.log('get');
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = this.instaBasicDisplay.accessToken;
                const data = yield this.instaBasicDisplay.retrieveMediaData(token, req.params.id);
                const instaResponse = {
                    success: true,
                    message: 'OK',
                    data: data
                };
                return res.status(200).json(instaResponse);
                console.log('get');
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ success: false, message: e.message });
            }
        }));
        this.router.put('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Method not allowed' });
        });
        this.router.post('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.delete('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
    }
}
exports.instaRoutes = new ApiInstaRoute();
//# sourceMappingURL=ApiInstaRoute.js.map