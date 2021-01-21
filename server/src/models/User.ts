import connection from '../misc/db';
import * as util from 'util';

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    deviceId?: string;
    verified?: boolean;
    email?: string;
    dob?: string;
    password?: string;
    role?: 'super' | 'admin' | 'user';
}

export class User {
    private db = connection;
    private readonly asyncQuery: any;

    constructor() {
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }

    public async find( filter: IUser | any): Promise<any> {
        const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
        const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
        const query = 'SELECT * from users' + whereStr;
        try {
            return await this.asyncQuery(query);
        } catch (e) {
            throw (e);
        }
    }

    public async create( user: IUser): Promise<any> {
        const query = 'INSERT INTO users (firstName, lastName, phone, deviceId, email, dob, password, verified, role) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM users WHERE phone=?) LIMIT 1';
        const params = [
            user.firstName,
            user.lastName,
            user.phone,
            user.deviceId,
            user.email,
            user.dob,
            user.password,
            user.verified,
            user.role,
            user.phone];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async update( user: IUser): Promise<any> {
        console.log(user);
        const id = user.id;
        const name = user.firstName ? user.firstName : null;
        const last = user.lastName ? user.lastName : null;
        const phone = user.phone ? user.phone : null;
        const email = user.email ? user.email : null;
        const dob = user.dob ? user.dob : null;
        const deviceId = user.deviceId ? user.deviceId : null;
        const password = user.password ? user.password : null;
        const verified = user.verified ? user.verified : null;
        const role = user.role ? user.role : null;
        const query = 'UPDATE users SET firstName = COALESCE(?, firstName), lastName = COALESCE(?, lastName), deviceId = COALESCE(?, deviceId), email = COALESCE(?, email), dob = COALESCE(?, dob), phone = COALESCE(?, phone), password = COALESCE(?, password), role = COALESCE(?, role), verified = COALESCE(?, verified) WHERE id = ?';
        const params = [name, last, deviceId, email, dob, phone, password, role, verified, id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async delete(id: number): Promise<any> {
        // const query = 'DELETE u.*, a.* FROM users u LEFT JOIN address a ON a.userId=u.id where u.id = ?';
        const query = 'DELETE from users where id = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async getUsersWithDob(dt: string = null): Promise<any> {
        let query = 'SELECT * FROM users WHERE MONTH(dob) = MONTH(NOW()) AND DAY(dob) = DAY(NOW())';
        if (dt) {
            query = `SELECT * FROM users WHERE MONTH(dob) = MONTH(${dt}) AND DAY(dob) = DAY(${dt})`;
        }
        try {
            return await this.asyncQuery(query);
        } catch (e) {
            throw (e);
        }
    }

}
