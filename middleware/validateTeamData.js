module.exports = function(req, res, next) {
  const { name, description, organization_id } = req.body;

  if (name && description && organization_id) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a valid name, description, organization Id for the team." });
  }
};