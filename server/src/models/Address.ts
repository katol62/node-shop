import connection from '../misc/db';
import * as util from 'util';

export interface IAddress {
    id?: number;
    country?: string;
    state?: string;
    city?: string;
    street?: string;
    house?: string;
    app?: string;
    entrance?: string;
    floor?: string;
    code?: string;
    userId?: number;
}

export class Address {
    private db = connection;
    private readonly asyncQuery: any;

    constructor() {
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }

    public async find( filter: IAddress | any): Promise<any> {
        const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
        const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
        const query = 'SELECT * from address' + whereStr;
        try {
            return await this.asyncQuery(query);
        } catch (e) {
            throw (e);
        }
    }

    public async create( address: IAddress | any): Promise<any> {
        const query = 'INSERT INTO `address` (country, state, city, street, house, app, entrance, floor, code, userId)  SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM address WHERE street=? AND house=? AND app=? AND userId=?) LIMIT 1';
        const params = [
            address.country ? address.country : 'RU',
            address.state ? address.state : 'Crimea',
            address.city,
            address.street,
            address.house,
            address.app ? address.app : null,
            address.entrance ? address.entrance : null,
            address.floor ? address.floor : null,
            address.code ? address.code : null,
            address.userId ? address.userId : null,
            address.street,
            address.house,
            address.app ? address.app : null,
            address.userId ? address.userId : null
        ];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async update( address: IAddress): Promise<any> {
        const query = 'UPDATE address SET city = ?, street = ?, house = ?, app = ?, entrance = ?, floor = ?, code = ?, userId = ? WHERE id = ?';
        const params = [
            address.city,
            address.street,
            address.house,
            address.app ? address.app : null,
            address.entrance ? address.entrance : null,
            address.floor ? address.floor : null,
            address.code ? address.code : null,
            address.userId ? address.userId : null,
            address.id
        ]
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async delete(id: number): Promise<any> {
        const query = 'DELETE FROM address where id = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

}
