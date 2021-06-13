const WebServer = require('./gateways/webserver/WebServer');
const Io = require('./gateways/socket.io/Io');
const WS = require('./ports/WS');

class SocketServer {
    constructor() {
        this.server = WebServer.initServer();
        this.io = Io.initSocket(this.server, WS.getEventHandlers());
    }
}

module.exports = SocketServer;
