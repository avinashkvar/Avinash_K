const express = require('express');

const router = express.Router();

const Product = require('../models/product.model');

const authenticate = require('../midleware/authenticate');

const authorise = require('../midleware/authorise')

const res = require('express/lib/response');

router.post('', authenticate, async (req, res) => {
	try {
		req.body.user_id = req.user._id;
		const product = await Product.create(req.body);

		return res.status(201).send(product);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.get('', async (req, res) => {
	try {
		const products = await Product.find().lean().exec();

		return res.status(200).send({ products: products });
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.patch('/:id', authenticate, authorise(["admin","seller"]), async (req, res) => {
	try {
		const products = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			},
		)
			.lean()
			.exec();

		return res.status(200).send({ products: products });
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

module.exports = router;
