const {config} = require('./app/helpers/helper');
const mobileSocket = require('./mobile-socket/core');
const robotSocket = require('./robot-socket/core');
const http = require('http');
const app = require('./app');
const port = config.general.port;
const mobilePortIO = 3001;
const robotPortIO = 3002;
const server = http.createServer(app);

const mobileIO = require('socket.io')(mobilePortIO, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
});

const robotIO = require('socket.io')(robotPortIO, {
    serveClient: false,
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
});

mobileSocket.init(mobileIO, robotIO);
robotSocket.init(mobileIO, robotIO);

server.listen(port, () => {
    console.log(`---- Server running on port [${port}], mobile [${mobilePortIO}], robot [${robotPortIO}] && Environment [${process.env.NODE_ENV}] ----`);
});
