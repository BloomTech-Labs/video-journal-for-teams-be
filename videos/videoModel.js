const db = require("../database/dbConfig.js");

module.exports = {
	find,
	findById,
	findByUserId,
	insert
};

function find() {
	return db("videos").select("*");
}

function findById(id) {
	return db
		.select("*")
		.from("videos")
		.where({ id: id })
		.first();
}

function findByUserId(user_id) {
	return db
		.select("*")
		.from("videos")
		.where({ owner_id: user_id })
}

function insert(vidObj) {
	clg(30, vidObj)
	return db("videos").insert(vidObj, "id");
}

function clg(...x) { console.log(...x) }