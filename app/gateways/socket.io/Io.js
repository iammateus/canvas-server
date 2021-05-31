const socket = require("socket.io");
const ClientSocketRepository = require("../../repositories/gateways/socket.io/ClientSocketRepository");

class Io {
    static initSocket(server, ws) {
        const config = {
            cors: {
                origin: "*",
            },
        };

        const io = socket(server, config);

        this.handleIO(io, ws);

        return io;
    }

    static handleIO(io, ws) {
        io.on("connection", (client) => {
            const clientSocketRepository = new ClientSocketRepository(client);
            ws.forEach((WS) => {
                client.on(WS.event, async (data) => {
                    await WS.handler(clientSocketRepository, data);
                });
            });
        });
    }
}

module.exports = Io;
