const faker = require("faker");

const mock = () => {
    return { [faker.lorem.word()]: faker.lorem.word() };
};

module.exports = mock;
