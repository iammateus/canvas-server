const { createServer } = require("http");

function initServer() {
  return createServer();
}

module.exports = {
  initServer,
};
