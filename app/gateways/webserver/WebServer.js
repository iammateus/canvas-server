const { createServer } = require('http');

class WebServer {
    static create() {
        return createServer();
    }
}

module.exports = WebServer;
