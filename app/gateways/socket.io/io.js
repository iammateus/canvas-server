const socket = require("socket.io");
const { ws } = require("../../ports/ws");

function initSocket(server, ws) {
  const io = socket(server, {
    cors: {
      origin: "*",
    },
  });

  handleIO(io, ws);

  return io;
}

function handleIO(io) {
  const listenerCallback = (client) => (fn) => (data) => fn(client, data);

  io.on("connection", (client) => {
    ws(listenerCallback(client)).map((WS) => {
      client.on(WS.event, WS.handler);
    });
  });
}

module.exports = {
  initSocket,
};
