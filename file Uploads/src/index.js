const express = require('express');

const app = express();

const userController = require('./controller/user.controller');

app.use(express.json());

app.use('/users', userController);

module.exports = app;
