const socket = require('socket.io');
const ClientSocketRepository = require('../../repositories/gateways/socket.io/ClientSocketRepository');

class SocketIO {
    static init(server, eventHandlers) {
        const config = {
            cors: {
                origin: '*',
            },
        };

        const io = socket(server, config);
        this.registrerHandlers(io, eventHandlers);

        return io;
    }

    static registrerHandlers(io, eventHandlers) {
        io.on('connection', (client) => {
            const clientSocketRepository = new ClientSocketRepository(client);
            eventHandlers.forEach((eventHandler) => {
                client.on(eventHandler.event, async (data) => {
                    await eventHandler.handler(clientSocketRepository, data);
                });
            });
        });
    }
}

module.exports = SocketIO;
