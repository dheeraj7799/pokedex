const Redis = require('ioredis');
const bluebird = require('bluebird');
const config = require('./config');

bluebird.promisifyAll(Redis);

const redisClient = new Redis({
    host: config.redis.host, port: 6379, showFriendlyErrorStack: true,
});

module.exports = redisClient;
