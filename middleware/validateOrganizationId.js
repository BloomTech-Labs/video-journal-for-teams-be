const Organization = require("../organization/organizationModel.js");

module.exports = function validateOrganizatonId(req, res, next) {
	const { id } = req.params;

	Organization.findById(id)
		.then((organization) => {
			if (organization) {
				next();
			} else {
				res.status(404).json({ message: `Organization ${id} not found.` });
			}
		})
		.catch((err) => res.status(500).json({ message: `Failed to get Organization ${id} from database.`, error: err }));
};
