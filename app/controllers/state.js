const {
  ClientSocketRepository,
} = require("../repositories/gateways/socket.io/ClientSocketRepository");

const state = (client, state) => {
  const { emitBroadcast } = ClientSocketRepository(client);

  return emitBroadcast("state", state);
};

module.exports = {
  state,
};
