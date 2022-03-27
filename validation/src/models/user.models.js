const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: false },
		email: { type: String, required: true },
		password: { type: String, required: true },
		confirm: { type: String, required: true },
		age: { type: Number, required: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

module.exports = mongoose.model('users', usersSchema);
