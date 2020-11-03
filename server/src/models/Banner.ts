import connection from '../misc/db';
import * as util from 'util';

export interface IBanner {
    id?: number;
    name?: string;
    description?: string | null;
    image?: string;
    display?: boolean;
    src?: any;
}

export class Banner {
    private db = connection;
    private readonly asyncQuery: any;

    constructor() {
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }

    public async find( filter: IBanner | any): Promise<any> {
        const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
        const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
        const query = 'SELECT * from banners' + whereStr;
        try {
            return await this.asyncQuery(query);
        } catch (e) {
            throw (e);
        }
    }

    public async create( banner: IBanner): Promise<any> {
        const query = 'INSERT INTO banners (name, description, image, display) SELECT ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM banners WHERE name=?) LIMIT 1';
        const params = [
            banner.name,
            banner.description,
            banner.image,
            banner.display,
            banner.name,
        ];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async update( banner: IBanner ): Promise<any> {
        const query = 'UPDATE banners SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), display = COALESCE(?, display) WHERE id = ?';
        const params = [
            banner.name ? banner.name : null,
            banner.description ? banner.description : null,
            banner.image ? banner.image : null,
            banner.display ? banner.display : false,
            banner.id
        ]
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }


    public async delete(id: number): Promise<any> {
        const query = 'DELETE from banners where id = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

}
