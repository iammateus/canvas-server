const { createServer } = require("http");

const initServer = () => {
    return createServer();
};

module.exports = {
    initServer,
};
