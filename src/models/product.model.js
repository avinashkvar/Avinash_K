const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		title: { type: String, require: true },
		price: { type: Number, require: true },
		user_id: { type: mongoose.Schema.Types.ObjectId, require: true },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);



const Product = mongoose.model('product', productSchema);

module.exports = Product;
