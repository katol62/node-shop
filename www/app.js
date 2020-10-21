"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const methodOverride = require("method-override");
const ApiRoutes_1 = require("./routes/ApiRoutes");
const express_csp_header_1 = require("express-csp-header");
class App {
    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', extended: false }));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(methodOverride());
        this.app.use(express_csp_header_1.expressCspHeader({
            directives: {
                'default-src': [express_csp_header_1.SELF],
                'script-src': [express_csp_header_1.SELF, express_csp_header_1.INLINE],
                'style-src': [express_csp_header_1.SELF, 'https:', express_csp_header_1.INLINE],
                'font-src': [express_csp_header_1.SELF, 'https:', 'data:'],
                'img-src': [express_csp_header_1.SELF, 'data:', '*.cdninstagram.com'],
                'media-src': [express_csp_header_1.SELF, 'data:', '*.cdninstagram.com'],
                'frame-ancestors': [express_csp_header_1.SELF],
                'worker-src': [express_csp_header_1.NONE],
            }
        }));
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