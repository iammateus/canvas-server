const WebServer = require('./gateways/webserver/WebServer');
const SocketIO = require('./gateways/socket.io/SocketIO');
const WS = require('./ports/WS');

class App {
    constructor() {
        this.webServer = WebServer.create();
        this.io = SocketIO.init(this.webServer, WS.getEventHandlers());
    }
}

module.exports = App;
