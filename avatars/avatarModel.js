const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findByUserId,
  findByTeamId,
};

function find() {
  return db("avatars").select("src");
}

function findByUserId(userId) {
  return db
    .select("avatar")
    .from("users")
    .where({ id: userId })
    .first();
}

function findByTeamId(teamId) {
  return db
    .select("avatar")
    .from("teams")
    .where({ id: teamId })
    .first();
}
