const express = require('express');
const config = require('./config/config');

const app = express();

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