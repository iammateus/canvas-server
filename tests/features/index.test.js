const { server, io } = require("../../app/init");
const Client = require("socket.io-client");
const state = require("../../app/controllers/state");
jest.mock("../../app/controllers/state");

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
    client.emit("state", {});

    setTimeout(() => {
      expect(state.state.mock.calls.length).toEqual(1);
      done();
    }, 2000);
  });
});
