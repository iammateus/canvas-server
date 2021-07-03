class StateController {
    static state(clientSocketRepository, state) {
        clientSocketRepository.emitToRooms('state', state);
    }
}

module.exports = StateController;
