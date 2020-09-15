import {NextFunction, Request, RequestHandler, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import config from "../misc/config";
import {Secret} from "jsonwebtoken";
import {IBaseResponse} from "../misc/db";
import {IUser} from "../models/User";

export const checkJwt: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // Get the jwt token from the head
    const token = req.body.token || req.params.token || req.headers['x-access-token'];
    let jwtPayload;
    // Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config.secret as Secret);
        req.body.decoded = jwtPayload;
    } catch (error) {
        // If token is not valid, respond with 401 (unauthorized)
        res.status(401).send({success: false, message: 'Invalid token'} as IBaseResponse);
        return;
    }
    next();
};

export const hasRole = (roles: any[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user: IUser = req.body.decoded;
        if (!user || (roles.indexOf(user.role) === -1)) {
            return res.status(403).send({success: false, message: 'Access denied'} as IBaseResponse);
        }
        next();
    };
};
