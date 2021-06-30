class StateController {
    static state(clientSocketRepository, state) {
        return clientSocketRepository.emitToRooms('state', state);
    }
}

module.exports = StateController;
