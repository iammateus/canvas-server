class RoomController {
    static join(clientSocketRepository, roomName) {
        clientSocketRepository.joinRoom(roomName);
    }
}

module.exports = RoomController;
