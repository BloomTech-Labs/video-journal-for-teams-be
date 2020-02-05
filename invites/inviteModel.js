const db = require("../database/dbConfig.js");

module.exports = {
	findByCode,
	findByTeam
};

function findByCode(code) {
	return db
		.select("*")
		.from("team_invite_link")
		.where({ link: code })
		.first();
}

function findByTeam(team_id) {
	return db
		.select("*")
		.from("team_invite_link")
		.where({ team_id: team_id })
		.first();
}

