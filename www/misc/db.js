"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql = require("mysql");
const config_1 = require("./config");
exports.connection = mysql.createPool({
    host: config_1.default.db.host,
    user: config_1.default.db.user,
    password: config_1.default.db.password,
    database: config_1.default.db.name,
    multipleStatements: true
});
exports.default = exports.connection;
//# sourceMappingURL=db.js.map