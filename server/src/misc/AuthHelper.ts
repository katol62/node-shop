import * as jwt from 'jsonwebtoken';
import {IUser} from "../models/User";
import {Secret} from "jsonwebtoken";
import config from "./config";
import { v4 as uuidv4 } from 'uuid';

export interface IPayload {
	id: number;
	phone: string;
	role: 'super' | 'admin' | 'user';
}

export class AuthHelper {

	public refreshTokens: any;

	static _instance: AuthHelper | null = null;

	public static get instance(): AuthHelper {
		if (!this._instance) {
			this._instance = new AuthHelper();
		}
		return this._instance;
	}

	constructor() {
		this.refreshTokens = {};
	}

	public generateToken(user: IUser): any {
		const payload: IPayload = {
			id: user.id,
			phone: user.phone,
			role: user.role
		};
		const token = jwt.sign(payload, config.secret as Secret, {
			expiresIn: config.tokenExpireIn
		});

		const refreshToken = uuidv4();
		this.refreshTokens[refreshToken] = user.phone;
		return { token, refreshToken };
	}

	public verifyRefreshToken(refreshToken: string, phone: string): boolean {
		return (refreshToken in this.refreshTokens && this.refreshTokens[refreshToken] === phone);
	}

	public deleteRefreshToken(refreshToken: string, phone: string): boolean {
		if (phone in this.refreshTokens && this.refreshTokens[refreshToken] === phone) {
			delete this.refreshTokens[refreshToken];
			return true;
		}
		return false;
	}

}
