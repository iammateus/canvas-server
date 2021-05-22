const { state } = require("../controllers/state");

const ws = (callback) => [
    {
        event: "state",
        handler: callback(state),
    },
];

module.exports = {
    ws,
};
