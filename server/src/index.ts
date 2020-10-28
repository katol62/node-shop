import config from './misc/config';
import app from './app';
import * as https from 'https';
import * as fs from 'fs';

console.log(config);

if (config.secure) {
    https.createServer({
        key: fs.readFileSync(config.sslKey.replace(/\\n/gm, '\n'), 'utf8'),
        cert: fs.readFileSync(config.sslCert.replace(/\\n/gm, '\n'), 'utf8'),
        requestCert: false,
        rejectUnauthorized: false,
    }, app).listen(config.port, () => {
        console.log(`https server is listening on ${config.port}`);
    });
} else {
    app.listen(config.port, () => {
        console.log(`server is listening on ${config.port}`);
    });
}

