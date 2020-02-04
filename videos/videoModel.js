const db = require("../database/dbConfig.js");

module.exports = {
    find,
    findById,
    findByUserId,
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
            "videos.owner_id",
            "users.first_name",
            "users.last_name",
            "videos.title",
            "videos.description",
            "videos.video_url",
            "videos.created_at",
            "prompts.question"
        )
}

function findByUserId(user_id) {
    return db
        .select("*")
        .from("videos")
        .where({ owner_id: user_id })
}