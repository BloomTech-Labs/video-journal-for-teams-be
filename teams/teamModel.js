const db = require("../database/dbConfig.js");

module.exports = {
	find,
	findById,
	findByUserId,
	insert,
	insertPrompt,
	insertUser,
	update,
	remove,
	getUserRole,
	getUsersByTeamId,
	getPromptsByTeamId,
	getVideosByTeamId,
};

function find() {
	return db("teams").select("*");
}

function findById(id) {
	return db
		.select("*")
		.from("teams")
		.where({ id: id })
		.first();
}

function insert(team) {
	return db("teams").insert(team, ["id", "name", "description", "created_at", "updated_at"]);
}

// Insert prompt
function insertPrompt(prompt) {
	prompt.updated_at = prompt.created_at = new Date(Date.now());
	return db("prompts").insert(prompt, ["id", "question", "description", "team_id", "created_at", "updated_at"]);
}

function findByUserId(userId) {
	return db("teams")
		.join("team_members", "teams.id", "team_members.team_id")
		.where("team_members.user_id", userId)
		.select(
			"teams.id as id",
			"teams.name as name",
			"teams.description as description",
			"teams.created_at as created_at",
			"teams.updated_at as updated_at",
			"team_members.role_id as role_id"
		);
}

// Insert user to a team
function insertUser(data) {
	return db("team_members").insert(data);
}

function remove(userId, teamId) {
	// delete from team_members where user_id = 2 and team_id = 1;
	return db("team_members")
		.where({
			user_id: userId,
			team_id: teamId,
		})
		.del();
}

// Update team info
function update(id, changes) {
	return db("teams")
		.where({ id })
		.update(changes);
}

function getUserRole(teamId, userId) {
	return db
		.select("role_id")
		.from("team_members")
		.where({ team_id: teamId, user_id: userId })
		.first();
}

// Get users in a specified team
function getUsersByTeamId(teamId) {
	return db("teams")
		.join("team_members", "teams.id", "team_members.team_id")
		.join("users", "users.id", "team_members.user_id")
		.where("team_members.team_id", teamId)
		.select("teams.name as team_name", "users.id as user_id", "team_members.role_id as role_id")
		.columns(db.raw("users.first_name || ' ' || users.last_name as user_full_name"));
}

// GET a team's prompts
function getPromptsByTeamId(teamId) {
	return db("prompts").where("prompts.team_id", teamId);
}

// GET a team's videos
function getVideosByTeamId(teamId) {
	return db("videos")
		.join("prompts", "videos.prompt_id", "prompts.id")
		.join("users", "videos.owner_id", "users.id")
		.where("prompts.team_id", teamId)
		.orderBy("prompts.id")
		.select(
			"prompts.id as prompt_id",
			"videos.id as video_id",
			"videos.video_url as video_url",
			"videos.title as title",
			"videos.created_at as created_at"
		)
		.columns(db.raw("users.first_name || ' ' || users.last_name as user_full_name"));
}
