class RoomController {
    static join(clientSocketRepository, roomName) {
        return clientSocketRepository.joinRoom(roomName);
    }
}

module.exports = RoomController;
