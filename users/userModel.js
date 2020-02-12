const db = require("../database/dbConfig.js");

module.exports = {
	find,
	findById,
	findByEmail,
	findByUsername,
	insert,
	update,
};

function find() {
	return db("users").select("*");
}

function findById(id) {
	return db
		.select("id", "email", "username", "first_name", "last_name", "avatar")
		.from("users")
		.where({ id: id })
		.first();
}

function findByEmail(email) {
	return db
		.select("*")
		.from("users")
		.where({ email: email })
		.first();
}

function findByUsername(username) {
	return db
		.select("*")
		.from("users")
		.where({ username: username })
		.first();
}

function insert(user) {
	return db("users").insert(user, "id");
}

function update(id, changes) {
	return db("users")
		.where({ id })
		.update(changes)
		.then((count) => {
			return findById(id);
		});
}
