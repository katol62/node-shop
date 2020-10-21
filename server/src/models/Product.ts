import connection from '../misc/db';
import * as util from 'util';

export interface IProduct {
    id?: number;
    name?: string;
    description?: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
}

export interface IProductExt extends IProduct{
    category?: any[];
}

export class Product {
    private db = connection;
    private readonly asyncQuery: any;

    constructor() {
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }

    public async find( filter: IProductExt | any): Promise<any> {
        const where = filter ? Object.keys(filter).map(key => (Product.filterOption(key, this.db.escape(filter[key])))) : [];
        const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
        const leftJoinStr = filter.category ? ' LEFT JOIN product_category c ' : '';
        const onStr = filter.category ? ` ON c.product = t.id` : '';
        const query = `SELECT t.* from product t ${leftJoinStr} ${onStr} ${whereStr}`;
        try {
            return await this.asyncQuery(query);
        } catch (e) {
            throw (e);
        }
    }

    public async getCategories( id: number): Promise<any> {
        const query = 'SELECT category from product_category WHERE product = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async create( product: IProductExt): Promise<any> {
        const query = `INSERT INTO product (name, description, image1, image2, image3, image4) SELECT ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM product WHERE name=?) LIMIT 1`;
        const params = [
            product.name,
            product.description,
            product.image1 ? product.image1 : null,
            product.image2 ? product.image2 : null,
            product.image3 ? product.image3 : null,
            product.image4 ? product.image4 : null,
            product.name,
        ];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async reference(product: number, category: number): Promise<any> {
        const query = `INSERT INTO product_category (product, category) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM product_category WHERE product=? AND category=?) LIMIT 1`;
        const params = [
            product,
            category,
            product,
            category
        ]
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async clearReference(product: number): Promise<any> {
        const query = `DELETE FROM product_category WHERE product = ?`;
        const params = [product];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async update( product: IProduct ): Promise<any> {
        const query = 'UPDATE product SET name = COALESCE(?, name), description = COALESCE(?, description), image1 = COALESCE(?, image1), image2 = COALESCE(?, image2), image3 = COALESCE(?, image3), image4 = COALESCE(?, image4) WHERE id = ?';
        const params = [
            product.name ? product.name : null,
            product.description ? product.description : null,
            product.image1 ? product.image1 : null,
            product.image2 ? product.image2 : null,
            product.image3 ? product.image3 : null,
            product.image4 ? product.image4 : null,
            product.id
        ]
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    public async delete(id: number): Promise<any> {
        const query = 'DELETE from product where id = ?';
        const params = [id];
        try {
            return await this.asyncQuery(query, params);
        } catch (e) {
            throw (e);
        }
    }

    /**
     * Misc
     */
    private static filterOption(key: string, value: any): string {
        if (key === 'category') {
            return `c.${key} IN (${value})`;
        }
        return `t.${key} = ${value}`;
    }

}
