const Teams = require("../teams/teamModel.js");

module.exports = function validateTeamId(req, res, next) {
	const { id } = req.params;
	console.log(id)
	Teams.findById(id)
		.then((team) => {
			if (team) {
				req.team = team;
				next();
			} else {
				res.status(404).json({ message: "Team not found." });
			}
		})
		.catch((err) => res.status(500).json({ message: "Failed to get team from database.", error: err }));
};
