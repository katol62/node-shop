import connection from '../misc/db';
import * as util from 'util';

export interface IUser {
    id?: number;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
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

    public async create( user: IUser, cryptPwd: string): Promise<any> {
        const query = 'INSERT INTO users (firstName, lastName, phone, email, password, role) SELECT ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM users WHERE phone=?) LIMIT 1';
        const params = [
            user.firstName,
            user.lastName,
            user.phone,
            user.email,
            cryptPwd,
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
        const name = user.firstName;
        const last = user.lastName;
        const phone = user.phone;
        const email = user.email;
        const password = user.password ? user.password : null;
        const role = user.role;
        let query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, password = ?, role = ? WHERE id = ?';
        let params = [name, last, email, phone, password, role, id];
        if (password == null) {
            query = 'UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, role = ? WHERE id = ?';
            params = [name, last, email, phone, role, id];
        }
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async delete(id: number): Promise<any> {
        const query = 'DELETE FROM users where id = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

}
