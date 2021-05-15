const server = require("http").createServer();

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (client) => {
    client.on("message", (data) => {
        client.emit("response", "The message was received");
    });
    client.on("disconnect", () => {
        /* … */
    });
});

module.exports = { server, io };
