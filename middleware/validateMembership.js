const Teams = require("../teams/teamModel");

module.exports = async function validateMembership(req, res, next) {
  const teamId = req.params.id;
  const uid = req.params.user_id;

  const role = await Teams.getUserRole(teamId, uid);
  if (role === undefined) {
    res.status(404).json({ message: `User ${uid} is not on team ${teamId}.` });
  } else {
    req.user.role = role.role_id;
    next();
  }
};
