require('dotenv').config();
const logger = require('./app/utils/logger');
const SocketServer = require('./app/SocketServer');

const socketServer = new SocketServer();
const port = process.env.APP_PORT;
socketServer.server.listen(port);
logger.info(`App is running on port ${port}`);
