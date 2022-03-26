const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
	email: { type: String, require: true },
	password: { type: String, require: true },
});

userSchema.pre('save', function (next) {
	const hash = bcrypt.hashSync(this.password, 7);
	this.password = hash;
	return next();
});

module.exports = mongoose.model('user', userSchema);