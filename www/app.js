"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const methodOverride = require("method-override");
const ApiRoutes_1 = require("./routes/ApiRoutes");
class App {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(methodOverride());
        this.configureRoutes();
    }
    configureRoutes() {
        this.router.get('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.post('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.router.put('/', (req, res) => {
            return res.status(405).json({ success: false, message: 'Not allowed' });
        });
        this.configStaticRoutes();
        this.app.use('/api', ApiRoutes_1.apiRoutes.router);
    }
    configStaticRoutes() {
        const distDir = '../../www/client';
        this.app.use(express.static(path.join(__dirname, distDir)));
        this.app.use(/^((?!(api)).)*/, (req, res) => {
            res.sendFile(path.join(__dirname, distDir + '/index.html'));
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map