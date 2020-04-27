const Roles = require("./role_constants");

module.exports = isOrgOwner = (orgRole) => {
  if (orgRole === Roles.ORG_OWNER) {
    return true;
  } else {
    return false;
  }
};

true