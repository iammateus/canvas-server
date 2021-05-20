const state = (client, state) => {
    client.broadcast.emit("state", state);
};

module.exports = {
    state,
};
