const StateController = require('../../app/controllers/StateController');
const ClientSocketRepository = require('../../app/repositories/gateways/socket.io/ClientSocketRepository');

jest.mock('../../app/repositories/gateways/socket.io/ClientSocketRepository');
const mockObject = require('../mocks/object.mock');

describe('StateController.state', () => {
    it('should be a function', () => {
        expect(StateController.state).toBeInstanceOf(Function);
    });

    it('should emit state event', () => {
        const clientSocketRepository = new ClientSocketRepository();
        clientSocketRepository.emitBroadcast.mockImplementationOnce(() => {});

        const state = mockObject();
        StateController.state(clientSocketRepository, state);
        expect(clientSocketRepository.emitBroadcast.mock.calls.length).toEqual(1);

        const firstArg = clientSocketRepository.emitBroadcast.mock.calls[0][0];
        const secondArg = clientSocketRepository.emitBroadcast.mock.calls[0][1];
        expect(firstArg).toEqual('state');
        expect(secondArg).toMatchObject(state);
    });
});
