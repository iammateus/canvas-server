const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient({ host: 'redis' });
const setAsync = promisify(client.hmset).bind(client);
const getAsync = promisify(client.hgetall).bind(client);

describe('Redis', () => {
    it('should set and get information from key', async () => {
        await setAsync('test', {
            value: 'aaaaaaa',
            test: 'aaa',
        });

        expect(await getAsync('test')).toMatchObject({
            value: 'aaaaaaa',
            test: 'aaa',
        });
    });

    afterAll(async () => {
        await client.end(true);
    });
});
