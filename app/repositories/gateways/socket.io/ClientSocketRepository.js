class ClientSocketRepository {
    constructor(client) {
        this.client = client;
    }

    emitBroadcast(event, data) {
        return this.client.broadcast.emit(event, data);
    }

    joinRoom(roomName) {
        return this.client.join(roomName);
    }
}

module.exports = ClientSocketRepository;
