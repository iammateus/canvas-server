const ClientSocketRepository = (client) => ({
  emitBroadcast(event, state) {
    return client.broadcast.emit(event, state);
  },
});

module.exports = { ClientSocketRepository };
