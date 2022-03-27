const express = require('express');

const router = express.Router();

const Product = require('../models/product.model');

const authentication = require('../middleware/authentication')

router.post('', authentication, async (req, res) => {
	try {
		req.body.userId = req.user._id;

		const product = await Product.create(req.body);

		return res.status(201).send(product);
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

module.exports = router