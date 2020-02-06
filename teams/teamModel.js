const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findByUserId,
  insert,
  insertUser,
  update,
  remove,
  getUsersByTeamId,
  getPromptsByTeamId
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

function findByUserId(userId) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
		.where("team_members.user_id", userId)
    .select("teams.id as id", "teams.name as name", "teams.description as description", "teams.created_at as created_at", "teams.updated_at as updated_at", "team_members.role_id as role_id")
}

// Insert user to a team
function insertUser(data) {
  return db("team_members")
    .insert(data);
}

function remove(userId, teamId) {
	// delete from team_members where user_id = 2 and team_id = 1;
	return db("team_members")
		.where({
			user_id: userId,
			team_id: teamId
		})
		.del();
		
}

// Update team info
function update(id, changes) {
  return db("teams")
    .where({ id })
    .update(changes)
}

// Get users in a specified team
function getUsersByTeamId(teamId) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .join("users", "users.id", "team_members.user_id")
		.where("team_members.team_id", teamId)
    .select("teams.name as team_name", "users.id as user_id")
    .columns(db.raw("users.first_name || ' ' || users.last_name as user_full_name"))
}

function getPromptsByTeamId(teamId) {
  return db("prompts")
		.where("prompts.team_id", teamId)
}