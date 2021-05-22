const { initServer } = require("./gateways/webserver/server");
const { initSocket } = require("./gateways/socket.io/io");
const { ws } = require("./ports/ws");

const server = initServer();
const io = initSocket(server, ws);

module.exports = { server, io };
