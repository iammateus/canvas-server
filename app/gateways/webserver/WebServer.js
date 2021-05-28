const { createServer } = require("http");

class WebServer {
    static initServer() {
        return createServer();
    }
}

module.exports = WebServer;
