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
	/* 
	takes object in this form
	{
		"owner_id": 73,
		"title": "Removal of Drainage Device from Peritoneum, Open Approach",
		"description": "Removal of Drainage Device from Peritoneum, Open Approach",
		"created_at": "2020-01-14 14:32:15",
		"updated_at": "2019-01-24 03:09:02",
		"video_url": "http://dummyimage.com/204x108.jpg/5fa2dd/ffffff",
		"prompt_id": 6
	}

	returns the resulting videos.id
	 */
	return db("videos").insert(vidObj, "id");
}

function clg(...x) { console.log(...x) }