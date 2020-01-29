const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findByUserId
};

function find() {
  return db("teams")
    .select("*");
}

function findByUserId(user_id) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .where("team_members.user_id", user_id)
    .select("teams.id as id", "teams.name as name", "teams.description as description", "teams.created_at as created_at", "teams.updated_at as updated_at", "team_members.role_id as role_id")
}