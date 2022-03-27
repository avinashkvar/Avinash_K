const User = require('../models/user.model');

var jwt = require('jsonwebtoken');

require('dotenv').config();

function newToken(user) {
	return jwt.sign({ user }, process.env.key);
}

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

const login = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(400).send('email or password is wrong');
		}

		const match = user.checkPassword(req.body.password);

		if (!match) {
			return res.status(400).send('email or password is wrong');
		}

        const token = newToken(user)

        return res.status(200).send({user,token})
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
};

module.exports = { register, login };
