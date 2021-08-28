require('dotenv').config();
const logger = require('./app/utils/logger');
const App = require('./app/App');

class Main {
    static main() {
        const app = new App();
        const port = process.env.APP_PORT;
        app.webServer.listen(port);
        logger.info(`App is running on port ${port}`);
    }
}

Main.main();
