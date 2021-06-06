require('dotenv').config();
const express = require('express');
const Pokedex = require('pokedex-promise-v2');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config/config');
const redis = require('./config/redis');

redis.on('connect', () => {
    console.log('Redis is up!');
});

redis.on('ready', () => {
    console.log('redis ready');
});

redis.on('error', () => {
    console.log('redis error');
});

redis.on('close', () => {
    console.log('redis close');
});

redis.on('reconnecting', () => {
    console.log('redis reconnecting');
});

redis.on('end', () => {
    console.log('redis end');
});

const app = express();

app.use(cors());
app.use(helmet());

const P = new Pokedex(config.pokedex_options);

const db = {
    redis: {
        read: redis,
        write: redis,
    },
    P,
};

app.set('db', db);

for (const k in config.versions) {
    app.use(config.versions[k], require(`./server${config.versions[k]}/index.route`));
}

// * Bring up the app
app.listen(config.port, (err) => {
    if (err) {
        console.log(`Error while bringing up the server on port ${config.port}`);
        return;
    }
    console.log(`App is running on port ${config.port}`);
});