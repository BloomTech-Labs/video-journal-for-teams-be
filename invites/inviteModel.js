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

function insert(insertion) {
	clg(27, insertion)
	const {team_id, newcode} = insertion;
	return db("team_invite_link")
		.insert({
			team_id,
			link: newcode,
			isValid: true,
			created_at: new Date(Date.now()),
			expires_at: expiration()
		})
		.then(() => {
			return findByCode(newcode)
		})
}

function update(changes) {
	const {team_id, newcode} = changes;
	return db('team_invite_link')
		.where({ team_id })
		.update({ 
			link: newcode,
			expires_at: expiration(),
			isValid: true
		})
		.then(() => {
			return findByCode(newcode);
		})
}

function expiration() {
	// const validtime = 86400000; // 1 day in ms
	const validtime = 5000; // 5s in ms
	return new Date(Date.now() + validtime)
}

function clg(...x) { console.log(...x) }