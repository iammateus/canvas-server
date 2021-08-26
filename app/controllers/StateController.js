class StateController {
    static state(clientSocketRepository, state) {
        console.log('event received');
        clientSocketRepository.emitToRooms('state', state);
    }
}

module.exports = StateController;
