const db = require("../database/dbConfig.js");

module.exports = {
  insertVideosFeedback,
  findVideosFeedbackById,
  findVideosFeedbackByVideoId,
  // findVideosFeedbackByUserId,
  // updateVideosFeedbackByVideoId
};

function insertVideosFeedback(Obj) {
  return db("feedback").insert(Obj, "id");
}

function findVideosFeedbackByVideoId(vidid) {
  return db("videos_feedback")
    .where("videos_feedback.video_id", vidid)
    .select("*");
}

function findVideosFeedbackById(id) {
  return db("videos_feedback")
    .join("videos", "videos_feedback.video_id", "videos.id")
    .where("videos_feedback.id", id)
    .first()
    .select("*");
}
