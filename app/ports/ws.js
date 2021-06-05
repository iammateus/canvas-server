const StateController = require("../controllers/StateController");
const RoomController = require("../controllers/RoomController");

const ws = [
    {
        event: "state",
        handler: StateController.state,
    },
    {
        event: "room",
        handler: RoomController.join,
    },
];

module.exports = {
    ws,
};
