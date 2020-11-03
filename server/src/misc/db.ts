import * as mysql from 'mysql';
import config from './config';

export interface IBaseRequest {
    data?: any;
}

export interface IBaseResponse {
    success?: boolean;
    message?: string;
    data?: any;
    code?: string;
}

export const connection = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    multipleStatements: true
});

export default connection;
