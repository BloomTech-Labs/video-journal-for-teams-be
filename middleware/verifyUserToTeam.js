const Teams = require("../teams/teamModel");
const db = require("../users/userModel");
const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = async function verifyUserToTeam(req, res, next) {
  const teamId = req.params.id;
  const userId = req.params.user_id;

  const userPermission = await Teams.matchUserToTeam(userId, parseInt(teamId));

  const userTeams = await Teams.findById(parseInt(teamId));

  if (userPermission.length > 0 || userTeams.team_type === "public") {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You have no permission to view this team." });
  }
};
