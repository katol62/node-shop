import * as dotenv from 'dotenv';
import {Secret} from "jsonwebtoken";

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
    db: IDataBase;
    secret: string | Secret | undefined;
    tokenExpireIn: number | undefined;
}

const ENV = 'dev'; // TODO change to process.env.NODE_ENV
dotenv.config();

export const config: IConfig = {
    env: process.env.NODE_ENV,
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    secret: process.env.JWT_SECRET,
    tokenExpireIn: 86400
};

export default config;
