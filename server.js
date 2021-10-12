const {config} = require('./app/helpers/helper');
const mobileSocket = require('./mobile-socket/core');
const jetsonSocket = require('./jetson-socket/core');
const http = require('http');
const app = require('./app');
const port = config.general.port;
const server = http.createServer(app);

mobileSocket.init();
jetsonSocket.init();

server.listen(port, () => {
    console.log(`---- Server running on port [${port}] && Environment [${process.env.NODE_ENV}] ----`);
});
