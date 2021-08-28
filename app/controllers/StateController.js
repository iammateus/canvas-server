const logger = require('../utils/logger');

class StateController {
    static state(clientSocketRepository, state) {
        logger.info('StateController.state - Event received');
        clientSocketRepository.emitToRooms('ChangeState', state);
    }
}

module.exports = StateController;
