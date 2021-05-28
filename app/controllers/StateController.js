class StateController {
    static state = (client, state) => {
        return client.emitBroadcast("state", state);
    };
}

module.exports = StateController;
