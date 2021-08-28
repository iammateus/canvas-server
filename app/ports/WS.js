const StateController = require('../controllers/StateController');
const RoomController = require('../controllers/RoomController');

class WS {
    static getEventHandlers() {
        return [
            {
                event: 'ChangeState',
                handler: StateController.state,
            },
            {
                event: 'JoinRoom',
                handler: RoomController.join,
            },
        ];
    }
}

module.exports = WS;
