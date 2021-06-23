class StateController {
    static state(clientSocketRepository, state) {
        return clientSocketRepository.emitBroadcast('state', state);
    }
}

module.exports = StateController;
