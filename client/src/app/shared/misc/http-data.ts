export interface IUser {
    id?: number;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string;
    deviceId?: string;
    email?: string | null;
    password?: string | null;
    newPassword?: string | null;
    role?: 'super' | 'admin' | 'user';
}

export interface IBanner {
    id?: number;
    name?: string;
    description?: string | null;
    image?: any;
    display?: boolean;
    all?: boolean;
    src?: any;
}

export interface IInstaData {
    data: IInstaMedia[];
    paging: IInstaPaging;
}

export interface IInstaPaging {
    cursors: {
        before: string;
        after: string;
    },
    next: string;
}

export interface IInstaMedia {
    id: string;
    media_type?: string;
    media_url?: string;
    permalink?: string;
    thumbnail_url?: string;
    timestamp?: string;
    username?: string;
    caption?: string;
}

export interface IBaseRequest {
    id?: any;
    data?: any;
}

export interface IBaseResponse {
    success?: boolean;
    message?: string;
    data?: any;
    code?: string;
}
export interface IAuthRequest extends IBaseRequest{
    phone?: string;
    email?: string;
    password?: string;
    verified?: boolean;
    type?: 'super' | 'admin' | 'user';
}

export interface IRegRequest extends IBaseRequest{
    phone?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export interface IAuthResponse extends IBaseResponse{
    token?: string;
    user?: IUser;
}

export interface IVerificationRequest extends IBaseRequest {
    email: string;
    password: string;
    id: string;
    cellphone: string;
    code: string;
    format: string;
}

export interface IVerificationResponse extends IBaseResponse {
    datalist: {
        status: number;
        queue_num: number;
    }
}

export interface IBannerRequest extends IBaseRequest{
    name?: string;
    banner?: string;
    description?: string;
    display?: boolean;
}

export interface IBannerListRequest extends IBaseRequest{
    name?: string;
    banner?: string;
    description?: string;
    display?: boolean;
    all?: boolean;
}

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    category?: any[]
}

export interface IProductRequest extends IBaseRequest {
    category?: string;
}
