import * as dotenv from 'dotenv';
import {boolean} from 'dotenv-utils'
import {Secret} from "jsonwebtoken";
import * as path from 'path';

interface IDataBase {
    host: string | undefined,
    user: string | undefined,
    password: string | undefined,
    name: string | undefined
}

interface IConfig {
    env: string;
    host: string | undefined;
    port: string | undefined;
    secure: boolean | undefined;
    smsVerify: boolean | undefined;
    sslKey: string | undefined;
    sslCert: string | undefined;
    db: IDataBase;
    secret: string | Secret | undefined;
    tokenExpireIn: number | undefined;
}

const environment = process.env.NODE_ENV;

dotenv.config({ path: path.join(__dirname, `../../.env.${environment}`)});
console.log(`environment: ${environment}`);

export const config: IConfig = {
    env: process.env.NODE_ENV,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    secure: boolean(process.env.SECURE),
    smsVerify: boolean(process.env.SMS_VERIFY),
    sslKey: process.env.SSLKEY,
    sslCert: process.env.SSLCERT,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    secret: process.env.JWT_SECRET,
    tokenExpireIn: 300 //86400
};

export default config;
