const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		title: { type: String, require: true },
		price: { type: String, require: true },
		userId: { type: String, require: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);


module.exports= mongoose.model('product',productSchema)