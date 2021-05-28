const { state } = require("../controllers/state");

const ws = [
    {
        event: "state",
        handler: state,
    },
];

module.exports = {
    ws,
};
