"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const db_1 = require("../misc/db");
const util = require("util");
class Product {
    constructor() {
        this.db = db_1.default;
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = filter ? Object.keys(filter).map(key => (Product.filterOption(key, this.db.escape(filter[key])))) : [];
            const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
            const leftJoinStr = filter.category ? ' LEFT JOIN product_category c ' : '';
            const onStr = filter.category ? ` ON c.product = t.id` : '';
            const query = `SELECT t.* from product t ${leftJoinStr} ${onStr} ${whereStr}`;
            try {
                return yield this.asyncQuery(query);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    getCategories(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT category from product_category WHERE product = ?';
            const params = [id];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    reference(product, category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO product_category (product, category) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM product_category WHERE product=? AND category=?) LIMIT 1`;
            const params = [
                product,
                category,
                product,
                category
            ];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    clearReference(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM product_category WHERE product = ?`;
            const params = [product];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE product SET name = COALESCE(?, name), description = COALESCE(?, description), image1 = COALESCE(?, image1), image2 = COALESCE(?, image2), image3 = COALESCE(?, image3), image4 = COALESCE(?, image4) WHERE id = ?';
            const params = [
                product.name ? product.name : null,
                product.description ? product.description : null,
                product.image1 ? product.image1 : null,
                product.image2 ? product.image2 : null,
                product.image3 ? product.image3 : null,
                product.image4 ? product.image4 : null,
                product.id
            ];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE from product where id = ?';
            const params = [id];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    /**
     * Misc
     */
    static filterOption(key, value) {
        if (key === 'category') {
            return `c.${key} IN (${value})`;
        }
        return `t.${key} = ${value}`;
    }
}
exports.Product = Product;
//# sourceMappingURL=Product.js.map