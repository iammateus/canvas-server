class ClientSocketRepository {
    constructor(client) {
        this.client = client;
    }

    emitBroadcast(event, data) {
        return this.client.broadcast.emit(event, data);
    }
}

module.exports = ClientSocketRepository;
