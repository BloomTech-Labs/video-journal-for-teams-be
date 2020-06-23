const db = require("../database/dbConfig.js");
const formatFeedback = require("../utils/formatFeedbackObj");

module.exports = {
  insertVideosFeedback,
  findVideosFeedbackById,
  findVideosFeedbackByVideoId,
  getOverallPerformance,
  getUserTeams,
  getUserPrompts,
  getUserVideos,
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

async function getOverallPerformance(userId) {
  const total = await db("videos_feedback")
    .join("videos", "videos_feedback.video_id", "videos.id")
    .where("videos.owner_id", userId)
    .orderBy("videos.created_at", "desc")
    .limit(3);

  const progressOverTime = await db("videos_feedback")
    .join("videos", "videos_feedback.video_id", "videos.id")
    .where("videos.owner_id", userId)
    .orderBy("videos.created_at", "desc")
    .select("videos_feedback.overall_performance", "videos.created_at");

  const format = formatFeedback(total, progressOverTime);

  return format;
}

function getUserTeams(userId) {
  return (
    db
      .select("*")
      // .select(db.raw("distinct name as team_name"))
      .from("teams")
      .join("team_members", "teams.id", "team_members.team_id")
      .where("user_id", userId)
  );
}

function getUserPrompts(userId) {
  return db
    .select(
      db.raw(
        "distinct question, description, prompts.team_id, prompts.created_at, prompts.updated_at, id"
      )
    )
    .from("prompts")
    .join("team_members", "prompts.team_id", "team_members.team_id")
    .where("user_id", userId);
}

function getUserVideos(userId) {
  return db("videos").where("owner_id", userId);
}
