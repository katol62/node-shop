import connection from "../misc/db";
import * as util from "util";

export interface ICategory {
    id?: number;
    name?: string;
    description?: string | null;
    image?: string;
    display?: boolean;
    src?: any;
}

export class Category {
    private db = connection;
    private readonly asyncQuery: any;

    constructor() {
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }

    public async find( filter: ICategory | any): Promise<any> {
        const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
        const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
        const query = 'SELECT * from category' + whereStr;
        try {
            return await this.asyncQuery(query);
        } catch (e) {
            throw (e);
        }
    }

    public async create( category: ICategory): Promise<any> {
        const query = 'INSERT INTO category (name, description, image, display) SELECT ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM category WHERE name=?) LIMIT 1';
        const params = [
            category.name,
            category.description,
            category.image,
            category.display,
            category.name,
        ];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async update( category: ICategory ): Promise<any> {
        const query = 'UPDATE category SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), display = COALESCE(?, display) WHERE id = ?';
        const params = [
            category.name ? category.name : null,
            category.description ? category.description : null,
            category.image ? category.image : null,
            category.display ? category.display : null,
            category.id
        ]
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }


    public async delete(id: number): Promise<any> {
        const query = 'DELETE from category where id = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

}
