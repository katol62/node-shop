"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./misc/config");
const app_1 = require("./app");
const https = require("https");
const fs = require("fs");
https.createServer({
    key: fs.readFileSync('./certs/hntserver.key'),
    cert: fs.readFileSync('./certs/hntserver.cert'),
    requestCert: false,
    rejectUnauthorized: false,
}, app_1.default).listen(config_1.default.port, () => {
    console.log(`server is listening on ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map