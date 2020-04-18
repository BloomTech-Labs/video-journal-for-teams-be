const Org = require("../organization/organizationModel");


module.exports = async function validateOrganizationRole(req, res, next) {
  const {org_id} = req.body
  console.log('this is req',req.body)
  console.log('red user id', req.user.id)
  const role = await Org.getOrgRole(req.user.id, org_id)
  console.log(role)
  if (role === undefined) {
    res.status(404).json({ message: `User ${req.user.id} is not a member of ${org_id}.` });
  } else {
    req.user.org_role = role.role_id;
    next();
  }

};



