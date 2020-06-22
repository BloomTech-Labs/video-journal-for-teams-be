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
  switchRole,
  matchUserToTeam,
  findPublicTeams,
  removeFromAllTeams,
  finduserTeamMembership,
  deleteTeam,
};

function find() {
  return db("teams").select("*");
}

function findById(id) {
  return db.select("*").from("teams").where({ id: id }).first();
}

function insert(team) {
  return db("teams").insert(team, [
    "id",
    "name",
    "description",
    "created_at",
    "updated_at",
    "organization_id",
  ]);
}

// function insert(team) {
// 	return db("teams").insert(team, ["id", "name", "description", "created_at", "updated_at"]);
// }

// Insert prompt
function insertPrompt(prompt) {
  prompt.updated_at = prompt.created_at = new Date(Date.now());
  return db("prompts").insert(prompt, [
    "id",
    "question",
    "description",
    "team_id",
    "created_at",
    "updated_at",
  ]);
}

function findByUserId(userId, organization_id) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .where({
      "team_members.user_id": userId,
      organization_id,
      team_type: "private",
    })
    .orderBy("created_at", "desc")
    .select(
      "teams.id as id",
      "teams.name as name",
      "teams.description as description",
      "teams.created_at as created_at",
      "teams.updated_at as updated_at",
      "team_members.role_id as role_id",
      "teams.organization_id"
    )

    .then(async (teamsByUserID) => {
      const publicTeams = await findPublicTeams(organization_id);
      return [...teamsByUserID, ...publicTeams];
    });
}

function finduserTeamMembership(user_id) {
  return db("team_members").select("*").where({ user_id });
}

function findPublicTeams(organization_id) {
  return db("teams").where({
    organization_id: organization_id,
    team_type: "public",
  });
}

// match specific user to specific team.
function matchUserToTeam(userId, teamId) {
  return db("teams")
    .join("team_members", "teams.id", "team_members.team_id")
    .join("users", "users.id", "team_members.user_id")
    .where("teams.id", teamId)
    .andWhere("users.id", userId)
    .select("teams.id as id", "teams.name as name", "users.first_name as user");
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

function removeFromAllTeams(userId) {
  // delete from team_members where user_id = 2 and team_id = 1;
  return db("team_members")
    .where({
      user_id: userId,
    })
    .del();
}

// Update team info
function update(id, changes) {
  return db("teams").where({ id }).update(changes);
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
    .select(
      "teams.name as team_name",
      "users.id as user_id",
      "team_members.role_id as role_id",
      "users.avatar as avatar",
      "users.email"
    )
    .columns(
      db.raw("users.first_name || ' ' || users.last_name as user_full_name")
    );
}

// GET a team's prompts
function getPromptsByTeamId(teamId) {
  return db("prompts")
    .orderBy("created_at", "desc")
    .where("prompts.team_id", teamId);
}

// GET a team's videos
function getVideosByTeamId(teamId) {
  return db("videos")
    .join("prompts", "videos.prompt_id", "prompts.id")
    .join("users", "videos.owner_id", "users.id")
    .where("prompts.team_id", teamId)
    .orderBy("videos.created_at", "desc")
    .select(
      "prompts.id as prompt_id",
      "videos.id as id",
      "videos.video_url as video_url",
      "videos.thumbnail as thumbnail",
      "videos.title as title",
      "videos.description as description",
      "videos.created_at as created_at"
    )
    .columns(
      db.raw("users.first_name || ' ' || users.last_name as user_full_name")
    )
    .then((videos) => {
      return Promise.all(
        videos.map(async (video) => {
          const feedback = await db("feedback").where(
            "feedback.video_id",
            video.id
          );
          return {
            ...video,
            feedback,
          };
        })
      );
    });
}

function switchRole(teamId, userId, roleId) {
  return db("team_members")
    .where({ team_id: teamId, user_id: userId })
    .update({ role_id: roleId })
    .then((count) => {
      return db("team_members")
        .where({ user_id: userId, team_id: teamId })
        .first();
    });
}

function deleteTeam(team_id) {
  return db("teams").where({ id: team_id }).del();
}
