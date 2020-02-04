module.exports = function(req, res, next) {
  const { name, description } = req.body;

  if (name && description) {
    next();
  } else {
    res.status(400).json({ message: "Please provide a valid name and description for the team." });
  }
};