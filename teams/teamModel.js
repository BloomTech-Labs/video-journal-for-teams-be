const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findByUserId,
  insert,
  insertUser,
  update,
  getUsersByTeamId
};

function find() {
  return db("teams")
    .select("*");
}

function findById(id) {
  return db
    .select("*")
    .from("teams")
    .where({ id: id })
    .first();
}

function insert(team) {
  return db("teams")
    .insert(team, ["id", "name", "description", "created_at", "updated_at"]);
}

function findByUserId(user_id) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .where("team_members.user_id", user_id)
    .select("teams.id as id", "teams.name as name", "teams.description as description", "teams.created_at as created_at", "teams.updated_at as updated_at", "team_members.role_id as role_id")
}

// Inset user to a team
function insertUser(data) {
  return db("team_members")
    .insert(data);
}

// Update team info
function update(id, changes) {
  return db("teams")
    .where({ id })
    .update(changes)
}

// Get users in a spcified team
function getUsersByTeamId(team_id) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .join("users", "users.id", "team_members.user_id")
    .where("team_members.team_id", team_id)
    .select("teams.name as team_name", "users.id as user_id", "users.first_name", "users.last_name")
}
