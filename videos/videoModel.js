const db = require("../database/dbConfig.js");

module.exports = {
	find,
	findById,
	findByUserId,
	findFeedbackByVideoId,
	insert,
	insertFeedback,
	update,
};

function find() {
	return db("videos").select("*");
}

function findById(video_id) {
	return db("videos")
		.join("users", "videos.owner_id", "users.id")
		.join("prompts", "videos.prompt_id", "prompts.id")
		.where("videos.id", video_id)
		.first()
		.select(
			"videos.id",
			"videos.owner_id as owner_id",
			"videos.title as video_title",
			"videos.description as video_description",
			"videos.video_url",
			"videos.created_at",
			"prompts.question as prompt_question"
		)
		.columns(db.raw("users.first_name || ' ' || users.last_name as owner_name"));
}

function findByUserId(user_id) {
	return db
		.select("*")
		.from("videos")
		.orderBy("created_at", "desc")
		.where({ owner_id: user_id });
}

function findFeedbackByVideoId(video_id) {
	return db("feedback")
		.join("users", "feedback.owner_id", "users.id")
		.where("feedback.video_id", video_id)
		.select(
			"feedback.id",
			"feedback.post",
			"feedback.video_id",
			"feedback.owner_id",
			"feedback.created_at",
			"feedback.updated_at"
		)
		.orderBy("feedback.created_at", "desc")
		.columns(db.raw("users.first_name || ' ' || users.last_name as owner_name"));
}

function insert(vidObj) {
	vidObj.created_at = vidObj.updated_at = new Date(Date.now());
	return db("videos").insert(vidObj, "id");
}

function insertFeedback(feedback) {
	feedback.created_at = feedback.updated_at = new Date(Date.now());
	return db("feedback").insert(feedback, "id");
}

function update(changes) {
	const id = changes.id;
	return db("videos")
		.where({ id })
		.update(changes)
		.then((ct) => {
			return findById(id);
		});
}
