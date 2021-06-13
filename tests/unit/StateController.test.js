const StateController = require('../../app/controllers/StateController');
const ClientSocketRepository = require('../../app/repositories/gateways/socket.io/ClientSocketRepository');

jest.mock('../../app/repositories/gateways/socket.io/ClientSocketRepository');
const mockObject = require('../mocks/object.mock');

describe('StateController.state', () => {
    it('should be a function', () => {
        expect(StateController.state).toBeInstanceOf(Function);
    });

    it('should emit state event', () => {
        const client = new ClientSocketRepository();
        client.emitBroadcast.mockImplementationOnce(() => {});
        const state = mockObject();
        StateController.state(client, state);
        expect(client.emitBroadcast.mock.calls.length).toEqual(1);

        const firstArg = client.emitBroadcast.mock.calls[0][0];
        const secondArg = client.emitBroadcast.mock.calls[0][1];
        expect(firstArg).toEqual('state');
        expect(secondArg).toMatchObject(state);
    });
});
