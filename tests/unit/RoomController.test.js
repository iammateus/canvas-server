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
        clientSocketRepository.joinRoom.mockImplementationOnce(() => {});

        const roomName = faker.lorem.word();
        RoomController.join(clientSocketRepository, roomName);
        expect(clientSocketRepository.joinRoom.mock.calls.length).toEqual(1);

        const firstArg = clientSocketRepository.joinRoom.mock.calls[0][0];
        expect(firstArg).toEqual(roomName);
    });
});
