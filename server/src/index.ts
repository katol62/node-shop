import config from './misc/config';
import app from './app';

app.listen(config.port, () => {
    console.log(`server is listening on ${config.port}`);
});
