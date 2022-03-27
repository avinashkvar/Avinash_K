const express = require('express');

const app = express();

const userController = require('./controllers/user.controller');

const { register, login } = require('./controllers/auth.controllers');

const productController = require('./controllers/product.controllers');

app.use(express.json());

app.use('/users', userController);

app.post('/register', register);

app.post('/login', login);

app.use('/product', productController);

module.exports = app;
