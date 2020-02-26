const db = require("../database/dbConfig.js");
const bcrypt = require("bcrypt");

module.exports = function verifyPassword(req, res, next) {
	const { id } = req.params;

	function findCurrentPassword(id) {
		return db
			.select("password")
			.from("users")
			.where({ id: id })
			.first();
	}

	if (!req.body.newPassword) {
		next()
	} else {
		findCurrentPassword(id)
			.then((currentPassword) => {
				const match = bcrypt.compareSync(req.body.currentPassword, currentPassword.password)
				if (match) {
					req.body.password = bcrypt.hashSync(req.body.newPassword, 8);
					next();
				} else {
					res.status(406).json({ message: `Current password is incorrect.` });
				}
			})
			.catch((err) => res.status(500).json({ message: `Failed to update password.`, error: err }));
	}
};