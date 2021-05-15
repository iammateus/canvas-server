const { server, io } = require("../../app/server");
const Client = require("socket.io-client");

describe("my beautiful app", () => {
    let clientSocket;

    beforeAll((done) => {
        server.listen(() => {
            const port = server.address().port;
            console.log({ port });
            clientSocket = new Client(`http://localhost:${port}`);
            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });

    it("should emit response event when message event is received", (done) => {
        clientSocket.on("response", (arg) => {
            expect(arg).toBe("The message was received");
            done();
        });
        clientSocket.emit("message", "Hello");
    });
});
