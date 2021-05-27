class ClientSocketRepository {
    constructor(client) {
        this.client = client;
    }

    emitBroadcast(event, state) {
        return this.client.broadcast.emit(event, state);
    }
}

module.exports = ClientSocketRepository;
