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
exports.verifyRoutes = void 0;
const express = require("express");
const axios_1 = require("axios");
class ApiVerifyRoute {
    constructor() {
        this.router = express.Router();
        this.axios = axios_1.default;
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const verifyResponse = {
                success: true,
                message: 'OK',
                data: { status: 1, queue_num: 70 }
            };
            return res.status(200).json(verifyResponse);
            // UNCOMMENT FOR PAID SERVICE
            //
            // const query = req.url.substr(1);
            // const url = `http://phoneverify.org/api.pl${query}`;
            // this.axios.get(url).then(
            //     (response: AxiosResponse) => {
            //         const verifyResponse: IBaseResponse = {
            //             success: true,
            //             message: response.statusText,
            //             data: response.data};
            //         console.log(response);
            //         return res.status(200).json(verifyResponse);
            //     }
            // ).catch( (error: AxiosError) => {
            //     console.log(error);
            //     return res.status(Number(error.code)).json({ success: false, message: error.message} as IBaseResponse);
            // })
        }));
        this.router.put('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.post('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.delete('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
    }
}
exports.verifyRoutes = new ApiVerifyRoute();
//# sourceMappingURL=ApiVerifyRoute.js.map