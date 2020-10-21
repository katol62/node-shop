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
exports.Banner = void 0;
const db_1 = require("../misc/db");
const util = require("util");
class Banner {
    constructor() {
        this.db = db_1.default;
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
            const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
            const query = 'SELECT * from banners' + whereStr;
            try {
                return yield this.asyncQuery(query);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    create(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO banners (name, description, image, display) SELECT ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM banners WHERE name=?) LIMIT 1';
            const params = [
                banner.name,
                banner.description,
                banner.image,
                banner.display,
                banner.name,
            ];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    update(banner) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE banners SET name = COALESCE(?, name), description = COALESCE(?, description), image = COALESCE(?, image), display = COALESCE(?, display) WHERE id = ?';
            const params = [
                banner.name ? banner.name : null,
                banner.description ? banner.description : null,
                banner.image ? banner.image : null,
                banner.display ? banner.display : null,
                banner.id
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
            const query = 'DELETE from banners where id = ?';
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
exports.Banner = Banner;
//# sourceMappingURL=Banner.js.map