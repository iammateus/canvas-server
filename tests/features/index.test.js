const { server, io } = require("../../app/init");
const Client = require("socket.io-client");
const state = require("../../app/controllers/state");
jest.mock("../../app/controllers/state");
const faker = require("faker");

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

    it('should call the correct handler to event "state"', (done) => {
        const data = { [faker.lorem.word()]: faker.lorem.word() };
        client.emit("state", data);

        setTimeout(() => {
            expect(state.state.mock.calls.length).toEqual(1);
            expect(state.state.mock.calls[0][0].constructor.name).toEqual(
                "Socket"
            );
            expect(state.state.mock.calls[0][1]).toMatchObject(data);
            done();
        }, 2000);
    });
});
