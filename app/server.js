const server = require("http").createServer();
const { state } = require("./controllers/state");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (client) => {
    client.on("state", (data) => {
        state(client, data);
    });

    client.on("disconnect", () => {
        /* … */
    });
});

module.exports = { server, io };
