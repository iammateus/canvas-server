const socket = require("socket.io");
const ClientSocketRepository = require("../../repositories/gateways/socket.io/ClientSocketRepository");

const handleIO = (io, ws) => {
    const listenerCallback = (client) => (fn) => (data) =>
        fn(new ClientSocketRepository(client), data);

    io.on("connection", (client) => {
        ws(listenerCallback(client)).map((WS) => {
            client.on(WS.event, WS.handler);
        });
    });
};

const initSocket = (server, ws) => {
    const io = socket(server, {
        cors: {
            origin: "*",
        },
    });

    handleIO(io, ws);

    return io;
};

module.exports = {
    initSocket,
};
