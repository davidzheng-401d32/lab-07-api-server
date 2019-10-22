'use strict';

const server = require('./lib/server');

server.start(process.env.PORT || 3000);