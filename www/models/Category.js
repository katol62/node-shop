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
exports.Category = void 0;
const db_1 = require("../misc/db");
const util = require("util");
class Category {
    constructor() {
        this.db = db_1.default;
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
            const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
            const query = 'SELECT * from category' + whereStr;
            try {
                return yield this.asyncQuery(query);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO category (name, description, image, display) SELECT ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM category WHERE name=?) LIMIT 1';
            const params = [
                category.name,
                category.description,
                category.image,
                category.display,
                category.name,
            ];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    update(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE category SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), display = COALESCE(?, display) WHERE id = ?';
            const params = [
                category.name ? category.name : null,
                category.description ? category.description : null,
                category.image ? category.image : null,
                category.display ? category.display : null,
                category.id
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
            const query = 'DELETE from category where id = ?';
            const params = [id];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
}
exports.Category = Category;
//# sourceMappingURL=Category.js.map