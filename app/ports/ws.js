const StateController = require("../controllers/StateController");

const ws = [
    {
        event: "state",
        handler: StateController.state,
    },
];

module.exports = {
    ws,
};
