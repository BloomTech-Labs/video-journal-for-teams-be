const Roles = require("./role_constants");

module.exports = isTeamLead = (userRole) => {
  if (userRole === Roles.TEAM_LEAD) {
    return true;
  } else {
    return false;
  }
};
