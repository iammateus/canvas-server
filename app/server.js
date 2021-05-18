const server = require("http").createServer();
const { state } = require("./state");

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (client) => {
    client.on("state", state.bind(null, client));

    client.on("message", (data) => {
        client.emit("response", "The message was received");
    });
    client.on("disconnect", () => {
        /* … */
    });
});

module.exports = { server, io };
