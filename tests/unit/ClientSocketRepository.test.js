const faker = require('faker');
const ClientSocketRepository = require('../../app/repositories/gateways/socket.io/ClientSocketRepository');
const ObjectMock = require('../mocks/ObjectMock');

describe('ClientSocketRepository.emitBroadcast', () => {
    it('should be a function', () => {
        const clientSocketRepository = new ClientSocketRepository();
        expect(clientSocketRepository.emitBroadcast).toBeInstanceOf(Function);
    });

    it('should emit an event', () => {
        const mockSocketClient = {
            broadcast: {
                emit: jest.fn(),
            },
        };
        const event = faker.lorem.word();
        const data = ObjectMock.mock();

        const clientSocketRepository = new ClientSocketRepository(mockSocketClient);
        clientSocketRepository.emitBroadcast(event, data);

        expect(mockSocketClient.broadcast.emit).toHaveBeenCalledTimes(1);
        expect(mockSocketClient.broadcast.emit).toHaveBeenCalledWith(event, data);
    });
});

describe('ClientSocketRepository.joinRoom', () => {
    it('should be a function', () => {
        const clientSocketRepository = new ClientSocketRepository();
        expect(clientSocketRepository.emitBroadcast).toBeInstanceOf(Function);
    });

    it('should put client inside room', () => {
        const mockSocketClient = {
            join: jest.fn(),
        };
        const roomName = faker.lorem.word();

        const clientSocketRepository = new ClientSocketRepository(mockSocketClient);
        clientSocketRepository.joinRoom(roomName);

        expect(mockSocketClient.join).toHaveBeenCalledTimes(1);
        expect(mockSocketClient.join).toHaveBeenCalledWith(roomName);
    });
});

describe('ClientSocketRepository.getRooms', () => {
    it('should be a function', () => {
        const clientSocketRepository = new ClientSocketRepository();
        expect(clientSocketRepository.getRooms).toBeInstanceOf(Function);
    });

    it('should return client\'s rooms', () => {
        const rooms = new Set([faker.lorem.word(), faker.lorem.word()]);
        const mockSocketClient = {
            rooms,
        };

        const clientSocketRepository = new ClientSocketRepository(mockSocketClient);
        expect(clientSocketRepository.getRooms()).toMatchObject(rooms);
    });
});

describe('ClientSocketRepository.emitToRooms', () => {
    it('should be a function', () => {
        const clientSocketRepository = new ClientSocketRepository();
        expect(clientSocketRepository.emitToRooms).toBeInstanceOf(Function);
    });

    it('should emit event to client\'s rooms', () => {
        const roomsArray = [faker.lorem.word(), faker.lorem.word()];
        const rooms = new Set(roomsArray);
        const mockSocketClient = {
            rooms,
        };
        mockSocketClient.to = jest.fn().mockReturnValue(mockSocketClient);
        mockSocketClient.emit = jest.fn().mockReturnValue(mockSocketClient);
        const event = faker.lorem.word();
        const data = ObjectMock.mock();

        const clientSocketRepository = new ClientSocketRepository(mockSocketClient);
        clientSocketRepository.emitToRooms(event, data);

        expect(mockSocketClient.to).toHaveBeenCalledTimes(2);
        expect(mockSocketClient.to).toHaveBeenNthCalledWith(1, roomsArray[0]);
        expect(mockSocketClient.to).toHaveBeenNthCalledWith(2, roomsArray[1]);

        expect(mockSocketClient.emit).toHaveBeenCalledTimes(2);
        expect(mockSocketClient.emit).toHaveBeenNthCalledWith(1, event, data);
        expect(mockSocketClient.emit).toHaveBeenNthCalledWith(2, event, data);
    });
});
