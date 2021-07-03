const faker = require('faker');

class ObjectMock {
    static mock() {
        return { [faker.lorem.word()]: faker.lorem.word() };
    }
}

module.exports = ObjectMock;
