import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as helmet from "helmet";
import * as methodOverride from 'method-override';
import {apiRoutes} from "./routes/ApiRoutes";
import config from './misc/config';
import {expressCspHeader, INLINE, NONE, SELF} from "express-csp-header";

class App {
    public app: express.Application;
    public router: express.Router;

    constructor() {
        this.app = express();
        this.router = express.Router();
        this.config();
    }


    private config() {
        this.app.use(bodyParser.json());
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb', extended: false}));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(methodOverride());
        if (config.env === 'prod' || config.env === 'stage') {
            this.app.use(expressCspHeader({
                directives: {
                    'default-src': [SELF],
                    'script-src': [SELF, INLINE],
                    'style-src': [SELF, 'https:', INLINE],
                    'font-src': [SELF, 'https:', 'data:'],
                    'img-src': [SELF, 'data:', '*.cdninstagram.com'],
                    'media-src': [SELF, 'data:', '*.cdninstagram.com'],
                    'frame-ancestors': [SELF],
                    'worker-src': [NONE],
                }
            }));
        }
        this.configureRoutes();
    }

    private configureRoutes() {
        this.router.get('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed' });
            }
        );
        this.router.post('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed' });
            }
        );
        this.router.put('/', (req: express.Request, res: express.Response) => {
                return res.status(405).json({ success: false, message: 'Not allowed' });
            }
        );
        this.configStaticRoutes();
        this.app.use('/api', apiRoutes.router);
    }

    private configStaticRoutes() {
        const distDir = '../../www/client';
        this.app.use(express.static(path.join(__dirname, distDir)));
        this.app.use(/^((?!(api)).)*/, (req, res) => {
            res.sendFile(path.join(__dirname, distDir + '/index.html'));
        });
    }
}

export default new App().app;
