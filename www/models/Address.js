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
exports.Address = void 0;
const db_1 = require("../misc/db");
const util = require("util");
class Address {
    constructor() {
        this.db = db_1.default;
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
            const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
            const query = 'SELECT * from address' + whereStr;
            try {
                return yield this.asyncQuery(query);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    create(address) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    update(address) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const query = 'DELETE FROM address where id = ?';
            const params = [id];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    deleteByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM address where userId = ?';
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
exports.Address = Address;
//# sourceMappingURL=Address.js.map