const faker = require('faker');
const RoomController = require('../../app/controllers/RoomController');
const ClientSocketRepository = require('../../app/repositories/gateways/socket.io/ClientSocketRepository');

jest.mock('../../app/repositories/gateways/socket.io/ClientSocketRepository');

describe('StateController.state', () => {
    it('should be a function', () => {
        expect(RoomController.join).toBeInstanceOf(Function);
    });

    it('should join client to a given room', () => {
        const clientSocketRepository = new ClientSocketRepository();
        clientSocketRepository.joinRoom = jest.fn();

        const roomName = faker.lorem.word();
        RoomController.join(clientSocketRepository, roomName);
        expect(clientSocketRepository.joinRoom).toHaveBeenCalledTimes(1);
        expect(clientSocketRepository.joinRoom).toHaveBeenCalledWith(roomName);
    });
});
