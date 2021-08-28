const WS = require('../../app/ports/WS');
const StateController = require('../../app/controllers/StateController');
const RoomController = require('../../app/controllers/RoomController');

describe('WS.getEventHandlers', () => {
    it('should be a function', () => {
        expect(WS.getEventHandlers).toBeInstanceOf(Function);
    });

    it('should have "state" event handler', () => {
        const handler = WS.getEventHandlers().find((item) => item.event === 'ChangeState');
        expect(handler).toBeTruthy();
        expect(handler.handler).toBe(StateController.state);
    });

    it('should have "room" event handler', () => {
        const handler = WS.getEventHandlers().find((item) => item.event === 'JoinRoom');
        expect(handler).toBeTruthy();
        expect(handler.handler).toBe(RoomController.join);
    });
});
