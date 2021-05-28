const Client = require("socket.io-client");

const state = require("../../app/controllers/state");
jest.mock("../../app/controllers/state");

const ClientSocketRepository = require("../../app/repositories/gateways/socket.io/ClientSocketRepository");

const SocketServer = require("../../app/SocketServer");
const { server, io } = new SocketServer();

const mockObject = require("../mocks/object.mock");

describe("my beautiful app", () => {
    let client;

    beforeAll((done) => {
        server.listen(() => {
            const port = server.address().port;
            client = new Client(`http://localhost:${port}`);
            client.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        client.close();
    });

    it('should call correct handler for event "state" with correct params', (done) => {
        const data = mockObject();

        client.emit("state", data);

        setTimeout(() => {
            expect(state.state.mock.calls.length).toEqual(1);

            const firstArg = state.state.mock.calls[0][0];
            const secondArg = state.state.mock.calls[0][1];

            expect(firstArg).toBeInstanceOf(ClientSocketRepository);
            expect(firstArg.client.id).toEqual(client.id);
            expect(secondArg).toMatchObject(data);
            done();
        }, 2000);
    });
});
