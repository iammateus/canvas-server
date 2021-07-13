const faker = require('faker');
const Client = require('socket.io-client');

const WS = require('../../app/ports/WS');
jest.mock('../../app/ports/WS');

const ClientSocketRepository = require('../../app/repositories/gateways/socket.io/ClientSocketRepository');
const App = require('../../app/App');

const ObjectMock = require('../mocks/ObjectMock');

describe('App', () => {
    let client;
    let eventName;
    let eventHandler;
    let app;

    beforeAll(() => new Promise((done) => {
        // Mock event and its handler
        eventName = faker.lorem.word();
        eventHandler = jest.fn();
        WS.getEventHandlers.mockReturnValueOnce([
            { event: eventName, handler: eventHandler },
        ]);

        // Init socket server
        app = new App();

        app.server.listen(() => {
            const { port } = app.server.address();
            client = new Client(`http://localhost:${port}`);
            client.on('connect', done);
        });
    }));

    afterAll(() => {
        app.io.close();
        client.close();
    });

    it('should call correct handler for event with right params (object)', () => new Promise((done) => {
        const data = ObjectMock.mock();

        client.emit(eventName, data);

        setTimeout(() => {
            expect(eventHandler).toHaveBeenCalledTimes(1);

            const firstArg = eventHandler.mock.calls[0][0];
            const secondArg = eventHandler.mock.calls[0][1];

            expect(firstArg).toBeInstanceOf(ClientSocketRepository);
            expect(firstArg.client.id).toEqual(client.id);

            expect(secondArg).toMatchObject(data);
            done();
        }, 100);
    }));

    it('should call correct handler for event with right params (string)', () => new Promise((done) => {
        const data = faker.lorem.word();

        client.emit(eventName, data);

        setTimeout(() => {
            expect(eventHandler).toHaveBeenCalledTimes(2);

            const firstArg = eventHandler.mock.calls[1][0];
            const secondArg = eventHandler.mock.calls[1][1];

            expect(firstArg).toBeInstanceOf(ClientSocketRepository);
            expect(firstArg.client.id).toEqual(client.id);
            expect(secondArg).toEqual(data);
            done();
        }, 100);
    }));
});
