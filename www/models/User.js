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
exports.User = void 0;
const db_1 = require("../misc/db");
const util = require("util");
class User {
    constructor() {
        this.db = db_1.default;
        this.asyncQuery = util.promisify(this.db.query).bind(this.db);
    }
    find(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = filter ? Object.keys(filter).map(key => (key + ' = ' + this.db.escape(filter[key]))) : [];
            const whereStr = where.length ? ' WHERE ' + where.join(' AND ') : '';
            const query = 'SELECT * from users' + whereStr;
            try {
                return yield this.asyncQuery(query);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO users (firstName, lastName, phone, email, password, verified, role) SELECT ?, ?, ?, ?, ?, ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM users WHERE phone=?) LIMIT 1';
            const params = [
                user.firstName,
                user.lastName,
                user.phone,
                user.email,
                user.password,
                user.verified,
                user.role,
                user.phone
            ];
            try {
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
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
                return yield this.asyncQuery(query, params);
            }
            catch (e) {
                throw (e);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const query = 'DELETE u.*, a.* FROM users u LEFT JOIN address a ON a.userId=u.id where u.id = ?';
            const query = 'DELETE from users where id = ?';
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
exports.User = User;
//# sourceMappingURL=User.js.map