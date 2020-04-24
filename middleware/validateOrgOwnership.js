const Org = require("../organization/organizationModel");


module.exports = async function validateOrgOwnership(req, res, next) {
  
    const {id} = req.params
    console.log('this is req',req.body)
    console.log('red user id', req.user.id)
    const role = await Org.getOrgRole(req.user.id, id)
    console.log(role)
    if ((role === undefined) || (role.role_id === 4)) {
      res.status(404).json({ message: `User ${req.user.id} is not a owner of org ${id}.` });
    } else {
      role.role_id === 3
      next();
    }

};

