const WebServer = require("./gateways/webserver/WebServer");
const Io = require("./gateways/socket.io/Io");
const { ws } = require("./ports/ws");

class SocketServer {
    constructor() {
        this.server = WebServer.initServer();
        this.io = Io.initSocket(this.server, ws);
    }
}

module.exports = SocketServer;
