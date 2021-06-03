const StateController = require("../../app/controllers/StateController");

describe("StateController.state", () => {
    it("should be a function", () => {
        expect(StateController.state).toBeInstanceOf(Function);
    });
});
