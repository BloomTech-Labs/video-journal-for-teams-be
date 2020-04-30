const Organization = require("../organization/organizationModel");

module.exports = async function validateOrgMembership(req, res, next) {
  const { id, user_id } = req.params;

  const role = await Organization.getOrgRole(user_id, id);

  if (role === undefined) {
    res
      .status(404)
      .json({ message: `User ${req.user.id} is not a member of org ${id}.` });
  } else {
    next();
  }
};
