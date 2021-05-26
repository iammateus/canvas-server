const state = (client, state) => {
    return client.emitBroadcast("state", state);
};

module.exports = {
    state,
};
