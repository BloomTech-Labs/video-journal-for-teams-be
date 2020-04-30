const Org = require("../organization/organizationModel");

module.exports = async function validateOrgOwnership(req, res, next) {
  const { id } = req.params;
  const role = await Org.getOrgRole(req.user.id, id);

  if (role === undefined || role.role_id !== 3) {
    res.status(404).json({ message: "shall not pass" });
  } else {
    req.user.role_id = 3;
    next();
  }
};
