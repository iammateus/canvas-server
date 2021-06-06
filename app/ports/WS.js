const StateController = require("../controllers/StateController");
const RoomController = require("../controllers/RoomController");

class WS {
    static getEventHandlers() {
        return [
            {
                event: "state",
                handler: StateController.state,
            },
            {
                event: "room",
                handler: RoomController.join,
            },
        ];
    }
}

module.exports = WS;
