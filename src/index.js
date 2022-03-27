const express = require('express');

const app = express();

const userController = require('./controllers/user.controller');

const { register, login } = require('./controllers/auth.controller');

const productController = require('./controllers/product.controller');

const passport = require('./configs/google.auth');

app.use(express.json());

app.use('/users', userController);

app.post('/register', register);

app.post('/login', login);

app.use('/product', productController);

app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login',
		session: false,
	}),
	function (req, res) {
		// Successful authentication, redirect home.
		res.status(300).send({ message: 'user is already logged in' });
	},
);

module.exports = app;
