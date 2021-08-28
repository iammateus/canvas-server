const socket = require('socket.io');
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const ClientSocketRepository = require('../../repositories/gateways/socket.io/ClientSocketRepository');

class SocketIO {
    static init(webServer, eventHandlers) {
        const config = {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
            },
        };

        const io = socket(webServer, config);
        this.registrerHandlers(io, eventHandlers);
        this.setAdapter(io);
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

    static setAdapter(io) {
        const pubClient = createClient({ host: 'redis' });
        const subClient = pubClient.duplicate();
        io.adapter(createAdapter(pubClient, subClient));
    }
}

module.exports = SocketIO;
