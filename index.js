require('dotenv').config();

const SocketServer = require('./app/SocketServer');

const socketServer = new SocketServer();

const port = process.env.APP_PORT;
socketServer.server.listen(port);
console.log(`App is running on port ${port}`);
