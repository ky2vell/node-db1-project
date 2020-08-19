const express = require('express');
const accountRouter = require('../routes/accounts');
const error = require('../middleware/error');
const colors = require('colors');

const server = express();

server.use(express.json());

// API Routes
server.use('/api/accounts', accountRouter);

// Error MiddleWare
server.use(error);

module.exports = server;
