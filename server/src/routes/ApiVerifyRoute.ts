import * as express from "express";
import axios, {AxiosInstance, AxiosResponse, AxiosError} from 'axios';
import {IBaseResponse} from "../misc/db";
import {CODES} from "../misc/codes";

class ApiVerifyRoute {
    public router: express.Router = express.Router();
    private axios: AxiosInstance = axios;

    constructor() {
        this.config();
    }

    private config() {
        this.router.get('/', async (req: express.Request, res: express.Response) => {

            const verifyResponse: IBaseResponse = {
                success: true,
                message: 'OK',
                data: {status: 1, queue_num: 70}};
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

export const verifyRoutes = new ApiVerifyRoute();
