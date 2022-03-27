const express = require('express');

const User = require('../models/user.models');

const { body, validationResult } = require('express-validator');

const routre = express.Router();

routre.post(
	'',
	body('firstName')
		.trim()
		.not()
		.isEmpty()
		.withMessage('firstName cannot be empty')
		.isLength({ min: 4 }, { max: 30 })
		.withMessage('first Name should be atleast 5 charactor'),
	body('email')
		.isEmail()
		.custom(async (value) => {
			const user = await User.findOne({ email: value });

			if (user) {
				throw new Error('Email is already exists');
			}
			return true;
		}),
	body('age')
		.trim()
		.not() 
		.isEmpty()
		.withMessage('age cannot be empty')
		.isNumeric()
		.withMessage('age should be number')
		.custom( (value) => {
			if (value < 1 || value > 150) {
				throw new Error('Incorrect age provided');
			}
			return true;
		})
		.withMessage('age should be between 0 to 100'),
	body('password')
		.not()
		.isEmpty()
		.withMessage('password should not be empty')
		.custom(async (value) => {
			var pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
			if (!value.match(pass)) {
				throw new Error('password must be strong');
			}
			return true;
		})
		.custom((value, { req }) => {
			if (value != req.body.confirm) {
				throw new Error('password and confirm should match');
			}
			return true;
		}),
	async (req, res) => {
		try {
			console.log(body());
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const user = await User.create(req.body);
			return res.status(201).send({ user: user });
		} catch (error) {
			return res.status(500).send({ error: error });
		}
	},
);

module.exports = routre;
