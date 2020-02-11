const Teams = require("../teams/teamModel");

module.exports = async function validateMembership(req, res, next) {
  const teamId = req.params.id;

  const role = await Teams.getUserRole(teamId, req.user.id);
  if (role === undefined) {
    res.status(404).json({ message: "User is not on the specified team." });
  } else {
    req.user.role = role.role_id;
    next();
  }
};
