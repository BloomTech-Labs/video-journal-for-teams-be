const db = require("../database/dbConfig.js");

module.exports = {
	findByCode,
	findByTeam,
	insert,
	update
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

function insert(code) {
	return db("team_invite_link").insert(code, ["link", "expires_at"]);
}

function update(changes) {
	clg(31, changes)
	clg(32, new Date(Date.now()));

	const validtime = 86400000; // 1 day in ms
	const {team_id, newcode} = changes;
	return db('team_invite_link')
		.where({ team_id })
		.update({ 
			link: newcode,
			expires_at: new Date(Date.now() + validtime),
			isValid: true
		})
		.then(() => {
			return findByCode(newcode);
		})
}

function clg(...x) { console.log(...x) }