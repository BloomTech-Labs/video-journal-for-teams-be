const Teams = require("../teams/teamModel");
const db = require("../users/userModel");
const passport = require("passport");
const Strategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = async function verifyUserBelongsToTeam(req, res, next) {
  const teamId = req.params.id;
  const userId = req.user.id;

  const userPermission = await Teams.matchUserToTeam(userId, parseInt(teamId));

  if (userPermission.length > 0) {
    next();
  } else {
    res
      .status(403)
      .json({ message: "You have no permission to view this team." });
  }
};
