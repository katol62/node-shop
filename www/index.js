"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./misc/config");
const app_1 = require("./app");
app_1.default.listen(config_1.default.port, () => {
    console.log(`server is listening on ${config_1.default.port}`);
});
//# sourceMappingURL=index.js.map