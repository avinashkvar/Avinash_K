const authorise = (premitedrole) => {
	return (req, res, next) => {
		const user = req.user;
		let permission = false;

		premitedrole.map((role) => {
			if (user.role.includes(role)) {
				permission = true;
			}
		});
		if (permission) {
			return next();
		} else {
			return res.status(401).send('you are not allowed to access');
		}
	};
};

module.exports=authorise;
