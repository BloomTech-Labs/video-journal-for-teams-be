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
	const {team_id, newcode, organization_id} = insertion;
	return db("team_invite_link")
		.insert({
			organization_id: organization_id,
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

	const {team_id, newcode, organization_id} = changes;

	return db('team_invite_link')
		.where({ team_id })
		.update({ 
			link: newcode,
			expires_at: expiration(),
			isValid: true,
			organization_id: organization_id
		})
		.then(() => {
			return findByCode(newcode);
		})
		.catch((err)=> {
			console.log(err)
		});
}


// Utility Function
function expiration() {
	const validtime = 86400000; // 1 day in ms
	// const validtime = 15000; // 5s in ms
	return new Date(Date.now() + validtime)
}

function clg(...x) { console.log(...x) }
