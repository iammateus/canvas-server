const SocketServer = require("./app/SocketServer");

const socketServer = new SocketServer();

socketServer.server.listen(3000);
