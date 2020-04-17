const Org = require("../organization/organizationModel");


module.exports = async function validateOrganizationRole(req, res, next) {
  const {org_id} = req.body

  const role = await Org.getOrgRole(org_id, req.user.id)
  if (role === undefined) {
    res.status(404).json({ message: `User ${req.user.id} is not on a member ${org_id}.` });
  } else {
    req.user.org_role = role.role_id;
    next();
  }
};



