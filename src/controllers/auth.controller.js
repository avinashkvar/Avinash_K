const User = require('../models/user.model');

var jwt = require('jsonwebtoken');

const newToken = (user) => {
	 return jwt.sign({ user }, 'masai');
};

const register = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (user) {
			return res.status(400).send('email is already exists');
		}
		user = await User.create(req.body);

		const token = newToken(user);

		return res.status(201).send({ user, token });
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

const login = (req, res) => {
	try {
		return res.status(201).send('login');
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

module.exports = { register, login };
