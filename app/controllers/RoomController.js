const logger = require('../utils/logger');

class RoomController {
    static join(clientSocketRepository, roomName) {
        logger.info(`RoomController.join - Event received ${roomName}`);
        clientSocketRepository.joinRoom(roomName);
    }
}

module.exports = RoomController;
