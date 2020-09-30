export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    newPassword?: string;
    role?: 'admin' | 'user';
}

export interface IBaseRequest {
    id?: number;
    data?: any;
}

export interface IBaseResponse {
    success?: boolean;
    message?: string;
    data?: any;
}
export interface IAuthRequest extends IBaseRequest{
    phone?: string;
    email?: string;
    password?: string;
    verified?: boolean;
    type?: 'super' | 'admin' | 'user';
}

export interface IAuthResponse extends IBaseResponse{
    token?: string;
    user?: IUser;
}
