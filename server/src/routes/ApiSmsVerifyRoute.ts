import * as express from "express";
import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {IBaseResponse} from "../misc/db";
import {CODES} from "../misc/codes";
import config from "../misc/config";

const apiId = 'FA032C9A-5221-F4D2-F2EA-F77ED6FF5D57'
const baseApiUrl = `https://sms.ru/sms/send`;

class ApiSmsVerifyRoute {
	public router: express.Router = express.Router();
	private axios: AxiosInstance = axios;

	constructor() {
		this.config()
	}

	private config() {
		this.router.get('/', async (req: express.Request, res: express.Response) => {

			const verifyResponse: IBaseResponse = {
				success: true,
				message: 'OK',
				data: {"status": "OK", // Возможные варианты: OK или ERROR.
					"status_code": 100, // Успешный код выполнения, сообщение принято на отправку
					"sms_id": "000000-10000000"}};
			return res.status(200).json(verifyResponse);

			// const query = req.url.substr(1);
			//
			// if (!config.smsVerify) {
			// 	const verifyResponse: IBaseResponse = {
			// 		success: true,
			// 		message: 'OK',
			// 		data: {status: 'OK', status_code: 100}};
			// 	return res.status(200).json(verifyResponse);
			// }
			// const url = `${baseApiUrl}${query}`;
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
		});
		this.router.put('/', (req: express.Request, res: express.Response) => {
				return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed});
			}
		);
		this.router.post('/', (req: express.Request, res: express.Response) => {
				return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed });
			}
		);
		this.router.delete('/', (req: express.Request, res: express.Response) => {
				return res.status(405).json({ success: false, message: 'Not allowed', code: CODES.methodNotAllowed });
			}
		);

	}
}

export const verifySmsRoutes = new ApiSmsVerifyRoute()
