const Teams = require("../teams/teamModel.js");

module.exports = function validateTeamId(req, res, next) {
  const { id } = req.params

  Teams.findById(id)
    .then((team) => {
      if (team) {
        next()
      } else {
        res.status(400).json({ message: "Invalid team id."})
      }
    })
    .catch(err => res.status(500).json({ message: "'Failed to get team from database'", error: err }))
}