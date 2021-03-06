class ClientSocketRepository {
    constructor(client) {
        this.client = client;
    }

    emitBroadcast(event, data) {
        this.client.broadcast.emit(event, data);
    }

    emitToRooms(event, data) {
        this.getRooms().forEach((room) => {
            this.client.to(room).emit(event, data);
        });
    }

    joinRoom(roomName) {
        this.client.join(roomName);
    }

    getRooms() {
        return this.client.rooms;
    }
}

module.exports = ClientSocketRepository;
