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
        clientSocketRepository.emitToRooms = jest.fn();

        const state = mockObject();
        StateController.state(clientSocketRepository, state);
        expect(clientSocketRepository.emitToRooms).toHaveBeenCalledTimes(1);
        expect(clientSocketRepository.emitToRooms).toHaveBeenCalledWith('state', state);
    });
});
