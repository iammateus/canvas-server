const faker = require('faker');
const ClientSocketRepository = require('../../app/repositories/gateways/socket.io/ClientSocketRepository');
const mockObject = require('../mocks/object.mock');

describe('ClientSocketRepository.emitBroadcast', () => {
    it('should be a function', () => {
        const clientSocketRepository = new ClientSocketRepository();
        expect(clientSocketRepository.emitBroadcast).toBeInstanceOf(Function);
    });

    it('should emit an event using socket.io client', () => {
        const mockSocketClient = {
            broadcast: {
                emit: jest.fn(),
            },
        };
        const event = faker.lorem.word();
        const data = mockObject();

        const clientSocketRepository = new ClientSocketRepository(mockSocketClient);
        clientSocketRepository.emitBroadcast(event, data);

        expect(mockSocketClient.broadcast.emit.mock.calls.length).toEqual(1);

        const firstArg = mockSocketClient.broadcast.emit.mock.calls[0][0];
        const secondArg = mockSocketClient.broadcast.emit.mock.calls[0][1];

        expect(firstArg).toEqual(event);
        expect(secondArg).toMatchObject(data);
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

        expect(mockSocketClient.join.mock.calls.length).toEqual(1);

        const firstArg = mockSocketClient.join.mock.calls[0][0];
        expect(firstArg).toEqual(roomName);
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
        const room1 = faker.lorem.word();
        const room2 = faker.lorem.word();
        const rooms = new Set([room1, room2]);
        const mockSocketClient = {
            rooms,
        };
        mockSocketClient.to = jest.fn().mockReturnValue(mockSocketClient);
        mockSocketClient.emit = jest.fn().mockReturnValue(mockSocketClient);
        const event = faker.lorem.word();
        const data = mockObject();

        const clientSocketRepository = new ClientSocketRepository(mockSocketClient);
        clientSocketRepository.emitToRooms(event, data);

        expect(mockSocketClient.to).toHaveBeenCalledTimes(2);
        expect(mockSocketClient.to).toHaveBeenNthCalledWith(1, room1);
        expect(mockSocketClient.to).toHaveBeenNthCalledWith(2, room2);

        expect(mockSocketClient.emit).toHaveBeenCalledTimes(2);
        expect(mockSocketClient.emit).toHaveBeenNthCalledWith(1, event, data);
        expect(mockSocketClient.emit).toHaveBeenNthCalledWith(2, event, data);
    });
});
