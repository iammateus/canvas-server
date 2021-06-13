const faker = require('faker');

const mock = () => ({ [faker.lorem.word()]: faker.lorem.word() });

module.exports = mock;
