const db = require("../database/dbConfig.js");

module.exports = {
	findByCode,
	findByTeam,
	insert,
	update,
	determineCode
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
	return
	const id = changes.id;
	// return db('team_invite_link')
	// 	.where({ id })
	// 	.update(changes)
	// 	.then(ct => {
	// 		return findByCode(changes.code);
	// 	})
}

function determineCode(changes) {
	const {team_id, team_name, newcode} = changes;
	clg(45,team_id)
	const gett = findByTeam(team_id);
	return (gett)
	const id = changes.id;
	// return db('team_invite_link')
	// 	.where({ id })
	// 	.update(changes)
	// 	.then(ct => {
	// 		return findByCode(changes.code);
	// 	})
}

function clg(...x) { console.log(...x) }