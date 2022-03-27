const express = require('express');

const Users = require('../models/user.model');

const router = express.Router();

const upload = require('../middelwares/uploads');

const fs = require('fs');

const path = require('path');

router.get('/', async (req, res) => {
	try {
		const users = await Users.find({}).lean().exec();

		return res.status(200).send({ users: users });
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.post('', upload.single('profilepic'), async (req, res) => {
	try {
		const users = await Users.create({
			firstName: req.body.firstName,
			profilepic: req.file.path,
		});

		return res.status(200).send({ users: users });
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.post('/multiple', upload.any('profilepic'), async (req, res) => {
	try {
		const filsepaths = req.files.map((elem) => {
			return elem.path;
		});

		const users = await Users.create({
			firstName: req.body.firstName,
			profilepic: filsepaths,
		});

		return res.status(200).send({ users: users });
	} catch (error) {
		return res.status(500).send({ error: error.message });
	}
});

router.patch('/:id', upload.single('profilepic'), async (req, res) => {
	try {
		const deleteFiile = await Users.findById(req.params.id);
		if (deleteFiile.profilepic != null) {
			fs.unlink(deleteFiile.profilepic[0], (err) => {
				if (err) {
					throw err;
				}
				console.log(deleteFiile.profilepic[0]);
			});
		}

		const user = await Users.findByIdAndUpdate(
			req.params.id,
			{
				profilepic: req.file.path,
			},
			{
				new: true,
			},
		)
			.lean()
			.exec();

		res.send(user);
	} catch (error) {
		res.send({ error: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const deleteFiile = await Users.findById(req.params.id);
		if (deleteFiile.profilepic != null) {
			fs.unlink(deleteFiile.profilepic[0], (err) => {
				if (err) {
					throw err;
				}
				console.log(deleteFiile.profilepic[0]);
			});
		}

		const user = await Users.findByIdAndDelete(req.params.id).lean().exec()

		res.send(user)
	} catch (error) {
		return res.send({ error: error.message });
	}
});

module.exports = router;
