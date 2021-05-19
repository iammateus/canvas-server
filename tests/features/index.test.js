const { server, io } = require("../../app/server");
const Client = require("socket.io-client");
const state = require("../../app/state");
jest.mock("../../app/state");

describe("my beautiful app", () => {
    let client;

    beforeAll((done) => {
        server.listen(() => {
            const port = server.address().port;
            console.log({ port });
            client = new Client(`http://localhost:${port}`);
            client.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        client.close();
    });

    it('should call the correct handler to event "state"', (done) => {
        client.emit("state", {});
        setTimeout(() => {
            expect(state.state.mock.calls.length).toEqual(1);
            done();
        }, 500);
    });
});
