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
        clientSocketRepository.emitToRooms.mockImplementationOnce(() => {});

        const state = mockObject();
        StateController.state(clientSocketRepository, state);
        expect(clientSocketRepository.emitToRooms.mock.calls.length).toEqual(1);

        const firstArg = clientSocketRepository.emitToRooms.mock.calls[0][0];
        const secondArg = clientSocketRepository.emitToRooms.mock.calls[0][1];
        expect(firstArg).toEqual('state');
        expect(secondArg).toMatchObject(state);
    });
});
