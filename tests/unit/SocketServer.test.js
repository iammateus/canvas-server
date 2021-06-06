const faker = require("faker");
const Client = require("socket.io-client");

const StateController = require("../../app/controllers/StateController");
jest.mock("../../app/controllers/StateController");

const RoomController = require("../../app/controllers/RoomController");
jest.mock("../../app/controllers/RoomController");

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

    it("should call correct handler for event", (done) => {
        const data = mockObject();

        client.emit("state", data);

        setTimeout(() => {
            expect(StateController.state.mock.calls.length).toEqual(1);

            const firstArg = StateController.state.mock.calls[0][0];
            const secondArg = StateController.state.mock.calls[0][1];

            expect(firstArg).toBeInstanceOf(ClientSocketRepository);
            expect(firstArg.client.id).toEqual(client.id);
            expect(secondArg).toMatchObject(data);
            done();
        }, 100);
    });

    it('should call correct handler for event "room" with correct params', (done) => {
        const roomName = faker.lorem.word();
        client.emit("room", roomName);

        setTimeout(() => {
            expect(RoomController.join.mock.calls.length).toEqual(1);

            const firstArg = RoomController.join.mock.calls[0][0];
            const secondArg = RoomController.join.mock.calls[0][1];

            expect(firstArg).toBeInstanceOf(ClientSocketRepository);
            expect(firstArg.client.id).toEqual(client.id);
            expect(secondArg).toEqual(roomName);
            done();
        }, 100);
    });
});