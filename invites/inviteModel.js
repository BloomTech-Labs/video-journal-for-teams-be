const db = require("../database/dbConfig.js");

module.exports = {
	findByCode
};

function findByCode(code) {
	return db
		.select("*")
		.from("team_invite_link")
		.where({ link: code })
		.first();
}
