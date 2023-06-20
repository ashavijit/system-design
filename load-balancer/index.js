const express = require('express');
const CORS = require('cors');
const APP = express();
APP.use(CORS());

const PORT = normalizePort(process.argv[2] || process.env.PORT || 3000);

APP.set('port', PORT);

const SERVER = require('http').createServer(APP);

SERVER.listen(APP.get('port'), () => {
    console.log(`Server is running on port ${APP.get('port')}`);
});